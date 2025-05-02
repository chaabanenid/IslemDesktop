import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import Swal from "sweetalert2";
import { shopsData } from "./data";

import { Shops } from "./shops.model";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-shops",
  templateUrl: "./shops.component.html",
  styleUrls: ["./shops.component.scss"],
})

/**
 * Ecommerce Shops component
 */
export class ShopsComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;

  shopsData: Shops[];
  status = ['Progress', 'Accepted', 'refused']
  stateValue = ["None", "Low", "Moderate", "Good", "Strong"];
  selection;
  filteredShopsData;
  formType;

  apimap = { incident: "incident", humanresources: "leaveRequest", ficheDePaie: "paySheet" };
  apiBackEnd;


  constructor(private http: HttpClient, private modalService: NgbModal, private formBuilder: FormBuilder, private route: ActivatedRoute) { }
  formData: FormGroup;
  submitted = false;
  role;
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.formType = params.get('type');
    });
    this.apiBackEnd = this.apimap[this.formType];
    var values = JSON.parse(localStorage.getItem("currentUser"));
    console.log("local", values.role)
    this.role = values.role

    this.breadCrumbItems = [
      { label: "Ecommerce" },
      { label: "Shops", active: true },
    ];

    this.formData = this.formBuilder.group({
      name: ["", [Validators.required,]],
      description: [
        "", [Validators.required]
      ],
      type: ["", [Validators.required,]],
      confidence: ["", [Validators.required]],
      author: ["", [Validators.required]],
      references: ["", [Validators.required]],
      _id: ["",],
    });
    /**
     * fetches data
     */
    this._fetchData();
    this.route.params.subscribe(params => {
      this.apiBackEnd = this.apimap[this.formType];
      // Check if specific parameters have changed
      this._fetchData(); // Fetch new data when parameters change
    });
  }
  buildForm(data: any) {
    const group: any = {};
    for (const key of Object.keys(data)) {
      group[key] = new FormControl(data[key], Validators.required);
    }
    this.formData = this.formBuilder.group(group);
  }
  get form() {
    return this.formData.controls;
  }
  position() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Event has been removed',
      showConfirmButton: false,
      timer: 1000,
    });
  }
  positionError() {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Event Error',
      showConfirmButton: false,
      timer: 1000,
    });
  }


  openModal(content: any, data: any) {
    this.buildForm(data);
    this.modalService.open(content); // or whatever modal method you use
  }

  /**
   * Fetches the data
   */
  private _fetchData() {
    if (this.role !== 'admin') {
      var values = JSON.parse(localStorage.getItem("currentUser"));
      this.http
        .get<any>(`http://localhost:8081/api/${this.apiBackEnd}/getById/` + values._id)
        .subscribe((data) => {
          this.shopsData = data.rec;
          this.filterData();
        })
        ;

    }
    else
      this.http
        .get<any>(`http://localhost:8081/api/${this.apiBackEnd}/getAll`)
        .subscribe((data) => {
          this.shopsData = data.users;
          this.filterData();
        })

        ;
  }
  deleteRecord(id) {
    this.http
      .delete<any>(`http://localhost:8081/api/${this.apiBackEnd}/delete/` + id)
      .subscribe((data) => {

        this._fetchData();
        this.position()
      }),
      (error) => this.positionError()
      ;

  }
  saveCustomer() {
    if (this.formData.valid) {
      let id = this.formData.value._id
      this.http
        .patch<any>(`http://localhost:8081/api/${this.apiBackEnd}/update/` + id, {
          ...this.formData.value,
        })
        .subscribe((data) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'repport has been changed',
            showConfirmButton: false,
            timer: 1000,
          });


          this._fetchData()
          return data;
        }),
        (err) => this.positionError();
      ;



      this.modalService.dismissAll()
    }
    this.submitted = true
  }


  updateStatus(id) {
    this.http
      .patch<any>(`http://localhost:8081/api/${this.apiBackEnd}/update/` + id, {
        status: this.selection
      })
      .subscribe((data) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'status has been changed',
          showConfirmButton: false,
          timer: 1000,
        });
        this._fetchData();
        this.modalService.dismissAll();
      }),
      (err) => this.positionError();


  }

  filterData(): void {
    const excludedKeys = ['__v', 'userId',];

    if (this.role == 'admin') {
      this.filteredShopsData = this.shopsData;
    }
    else {
      this.filteredShopsData = this.shopsData.map(shop => {

        return Object.keys(shop)
          .filter(key => !excludedKeys.includes(key))
          .reduce((obj, key) => {
            obj[key] = shop[key];
            return obj;
          }, {});
      });
    }
  }


  changeFn(val) {
    this.selection = val;
    console.log("Dropdown selection:", val);
  }


}

