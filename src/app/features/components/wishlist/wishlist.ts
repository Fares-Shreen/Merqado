import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { WishListServices } from '../../wishListServices/wish-list-services';
import { wishListProduct } from '../../interfaces/wishListInterFace';
import { CartServices } from '../../services/cartServices/cart-services';
import { ToastrService } from 'ngx-toastr';
import { slideInDownOnEnterAnimation } from 'angular-animations';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-wishlist',
  imports: [TranslatePipe],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.scss',
  animations: [
    slideInDownOnEnterAnimation({ duration: 1500 }),
  ]
})
export class Wishlist implements OnInit {
  constructor(private _WishListServices: WishListServices, private _CartServices: CartServices, private toastr: ToastrService) { }
  wishListData: wishListProduct[] = [];
  ngOnInit(): void {
    this.displayAllWishListProducts();
  }
  displayAllWishListProducts() {
    this._WishListServices.getProductOnWishList().subscribe({
      next: res => {
        this.wishListData = res.data;

      }
    })
  }
  removeWishListProduct(productId: string) {
    this._WishListServices.removeProductToWishList(productId).subscribe({
      next: res => {
        this.wishListData = res.data;
        this.displayAllWishListProducts();
        this.toastr.success(res.message, '', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
          progressBar: true,
        })
      }
    })
  }
  addProductToCart(productId: string) {
    if (localStorage.getItem("userToken")) {
      this._CartServices.addProductToCart(productId).subscribe({
        next: res => {
          this.toastr.success(res.message, '', {
            timeOut: 3000,
            positionClass: 'toast-bottom-right',
            progressBar: true,
          })
        }
      })
    }

  }

}
