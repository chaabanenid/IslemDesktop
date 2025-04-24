import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Customers } from './customers.model';
import Swal from 'sweetalert2';
import { customersData } from './data';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class CustomersComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  customersData: Customers[];
  updateUserId:any;

  term: any;

  // page
  currentpage: number;

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Ecommerce' }, { label: 'Customers', active: true }];

    this.formData = this.formBuilder.group({
      name: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      address: ['', [Validators.required]],
      companyName: ['', [Validators.required]]
    });

    this.currentpage = 1;

    /**
     * Fetches the data
     */
    this._fetchData();
  }

  /**
   * Customers data fetches
   */
  private _fetchData() {
    this.http
      .get<any>(`http://localhost:8081/api/user/all`)
      .subscribe((data) => {
        console.log(data.user)
        this.customersData = data.user
      });
  }
  get form() {
    return this.formData.controls;
  }

  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any,data) {

    this.formData.setValue({
      name: data.name, phoneNumber: data.phoneNumber,
      email: data.email,
      address: data.address, companyName: data.companyName,

    })


    this.modalService.open(content);
  }

  saveCustomer() {
    const currentDate = new Date();
    if (this.formData.valid) {
      const username = this.formData.get('username').value;
      const email = this.formData.get('email').value;
      const phone = this.formData.get('phone').value;
      const address = this.formData.get('address').value;
      const balance = this.formData.get('balance').value;

      this.customersData.push({
        id: this.customersData.length + 1,
        username,
        email,
        phone,
        address,
        balance,
        rating: '4.3',
        date: currentDate + ':'
      })
      this.modalService.dismissAll()
    }
    this.submitted = true
  }
  deleteUser(id){



    this.http
    .delete<any>(`http://localhost:8081/api/user/delete-account/`+id, {
    })
    .subscribe((data) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'user has been deleted',
        showConfirmButton: false,
        timer: 1000,
      });

  this._fetchData()
  })



}

editClient(){
  this.http
    .put<any>(`http://localhost:8081/api/user/update-profile/` + this.updateUserId, {
      ...this.formData.value,
    })
    .subscribe((data) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'repport has been changed',
        showConfirmButton: false,
        timer: 1000,
      })
    
      this._fetchData()
    
},

(err)=>{
Swal.fire({
  position: 'center',
  icon: 'error',
  title: err.error.message,
  showConfirmButton: false,
  timer: 1000,
})
}
)


}

}
