import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { CartServices } from '../../services/cartServices/cart-services';
import { cartData } from '../../interfaces/cart';
import { RouterLink } from '@angular/router';
import { slideInDownOnEnterAnimation } from 'angular-animations';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-cart',
  imports: [RouterLink,TranslatePipe],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
        animations: [
  slideInDownOnEnterAnimation({ duration: 1500 }),
  ]
})
export class Cart implements OnInit {
  cartData!: cartData;

  constructor(public _CartServices: CartServices, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.displayCartProducts();
  }
  displayCartProducts() {
    this._CartServices.getCartProducts().subscribe({
      next: res => {
        this.cartData = res.data
        this._CartServices.productCartNumber.set(res.numOfCartItems);
      }
    })
  }
  updateProduct(productId: string, count: number) {
    this._CartServices.updateProductQuantity(productId, count.toString()).subscribe({
      next: res => {
        this.cartData = res.data
        this._CartServices.productCartNumber.set(res.numOfCartItems);
        this.toastr.success("Product update to cart successfully", '', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
          progressBar: true,
        })
      }
    })
  }
  removeSpecificProduct(productId: string) {
    this._CartServices.removeSpecificProduct(productId).subscribe({
      next: res => {
        this.cartData = res.data
        this._CartServices.productCartNumber.set(res.numOfCartItems);
        this.toastr.success("Product removed to cart successfully", '', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
          progressBar: true,
        })
      }
    })
  }
  clearProductsProduct() {
    this._CartServices.clearAllProduct().subscribe({
      next: res => {
        this._CartServices.productCartNumber.set(res.numOfCartItems);
        this.displayCartProducts();
        this.toastr.success("Now cart is empty", '', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
          progressBar: true,
        })
      }
    })
  }
}
