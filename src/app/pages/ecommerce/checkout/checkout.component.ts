import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";
import { FORM_CONFIGS } from "../FormFields/HelpDeskFields";
@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"],
})

/**
 * Ecommerce checkout component
 */
export class CheckoutComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  selectValue = [];
  stateValue = [];
  loading=false;
  submit;
  displayToast=false;
  formType;
  formMeta;
  formMetaFieldKeys: string[] = [];

  constructor(public formBuilder: FormBuilder, private http: HttpClient,private route: ActivatedRoute) {}
  get form() {
    return this.productForm.controls;
  }

  productForm: FormGroup;
  ngOnInit() {
    this.loading = false;
    
    this.route.paramMap.subscribe((params) => {
      this.formType = params.get('type'); // e.g., incident, humanresources
      
  
      if (this.formType && FORM_CONFIGS[this.formType]) {
        this.formMeta = FORM_CONFIGS[this.formType];
        this.formMetaFieldKeys = Object.keys(this.formMeta.fields);
        // Build dynamic form from config
        const group: { [key: string]: any } = {};
        Object.keys(this.formMeta.fields).forEach(field => {
          group[field] = this.formMeta.fields[field].control;
        });
        this.productForm = this.formBuilder.group(group);
  
      } else {
        console.error('Invalid form type in route');
      }
    });
    this.submit = false;
    

    this.breadCrumbItems = [
      { label: "Ecommerce" },
      { label: "Checkout", active: true },
    ];

    this.selectValue = [
      "adware",
      "backdoor",
      "bot",
      "boot kit",
      "ddos",
      "downoader",
      "dropper",
      "exploit-kit",
      "keylogger",
      "ransomware",
      "remote-access-trojen",
      "resource-exploitation",
      "rogue-security-software",
      "root-kit",
      "screen-capture",
      "spyware",
      "trojan",
      "Undefined",
      "virus",
      "webshell",
      "wiper",
      "worm",
    ];

    this.stateValue = ["None", "Low", "Moderate", "Good", "Strong"];
  }
  position() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Event has been saved',
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

  validSubmit() {
    this.submit = true;
    this.loading=true;
    const userId = JSON.parse(localStorage.getItem("currentUser"));
    const apimap={incident:"incident",humanresources:"leaveRequest",ficheDePaie:"paySheet"};
    const apiBackEnd=apimap[this.formType]
    console.log("apiBackEnd",apiBackEnd)
    //réquést
    this.http
      .post<any>(`http://localhost:8081/api/${apiBackEnd}/add`, {
        ...this.productForm.value,
        userId: userId._id,
      })
      .subscribe((data) => {
        if(data.success){
          this.loading=false;
          this.position()
        }
       
        return data;
      },
      (err) => {this.positionError()
      this.loading=false;
      },
      )
      
      ;
  }
}
