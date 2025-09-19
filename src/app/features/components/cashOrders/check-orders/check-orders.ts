import { ShippingAddress } from './../../../interfaces/cashOrdersInterface';
import { Component } from '@angular/core';
import { CheckOrdersServices } from '../../../services/cashOrdersServices/check-orders-services';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { CartServices } from '../../../services/cartServices/cart-services';

@Component({
  selector: 'app-check-orders',
  imports: [ReactiveFormsModule],
  templateUrl: './check-orders.html',
  styleUrl: './check-orders.scss'
})
export class CheckOrders {
  constructor(private _CartServicesrt:CartServices,private _CheckOrdersServices: CheckOrdersServices, private _ToastrService: ToastrService, private _ActivatedRoute: ActivatedRoute,private _Router:Router) { }
  cashOrdersForm: FormGroup = new FormGroup({
    details: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    city: new FormControl(null, [Validators.required])
  })
  isLoadingForCash!: boolean;
  isLoadingForOnline!: boolean;
  cashOrdersFormSubmit() {
    this.isLoadingForCash = true;
    if (this.cashOrdersForm.valid) {
      this._ActivatedRoute.params.subscribe({
        next: res => {
          
          if (res["cartId"]) {
                      this._CheckOrdersServices.cashOrder(this.cashOrdersForm.value,res["cartId"]).subscribe({
            next: res => {
              localStorage.setItem("userId",res.data.user);
              this.isLoadingForCash = false;
              this._CartServicesrt.productCartNumber.set(0);
              this._ToastrService.success("Order is added 🎉", '', {
                timeOut: 3000,
                positionClass: 'toast-bottom-right',
                progressBar: true,
              })
              this._Router.navigate(["/allorders"])
            }
          })
          }

        }
      })

    }
  }
    onlineOrdersFormSubmit() {
    this.isLoadingForOnline = true;
    if (this.cashOrdersForm.valid) {
      this._ActivatedRoute.params.subscribe({
        next: res => {
          if (res["cartId"]) {
                      this._CheckOrdersServices.onlinePaymentOrder(this.cashOrdersForm.value,res["cartId"]).subscribe({
            next: res => {
              this.isLoadingForOnline = false;
              this._CartServicesrt.productCartNumber.set(0);
              this._ToastrService.success("Order is added 🎉", '', {
                timeOut: 3000,
                positionClass: 'toast-bottom-right',
                progressBar: true,
                
              })
              window.open(res.session.url,"_self")
            }
          })
          }

        }
      })

    }
  }
  

}
