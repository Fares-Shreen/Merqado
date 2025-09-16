
import { Component, Input, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { products } from '../../../../features/interfaces/products';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../../../core/services/auth/auth';
import { CartServices } from '../../../../features/services/cartServices/cart-services';
import { WishListServices } from '../../../../features/wishListServices/wish-list-services';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-product-card',
  imports: [RouterLink,CommonModule,TranslatePipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',

})
export class ProductCard implements OnInit {
  constructor(
    public _Auth: Auth,
    private _CartServices: CartServices,
    private _WishListServices: WishListServices,
    private _Router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private toastr: ToastrService
  ) { }

  isRed: boolean = false;
  isFavorite: boolean = false;
  @Input() product!: products;

  ngOnInit() {
    this.checkFavouriteItems();
  }
  checkFavouriteItems() {
    if (isPlatformBrowser(this.platformId) && localStorage.getItem("userToken") && this.product?._id) {
      this._WishListServices.getProductOnWishList().subscribe({
        next: res => {
          const wishlistProducts = res.data;
          const found = wishlistProducts.find((product: any) => product._id === this.product._id);
          if (found) {
            this.isFavorite = true;
            this.isRed = true;
          } else {
            this.isFavorite = false;
            this.isRed = false;
          }
        }
      });
    }
  }
  addProductToCart(productId: string) {
    if (localStorage.getItem("userToken")) {
      this._CartServices.addProductToCart(productId).subscribe({
        next: res => {
          this._CartServices.productCartNumber.next(res.numOfCartItems);
          this.toastr.success(res.message, '', {
            timeOut: 3000,
            positionClass: 'toast-bottom-right',
            progressBar: true,
          })
        }
      })
    }
  }

  addProductToWishList(productId: string) {
    if (localStorage.getItem("userToken")) {
      this._WishListServices.appProductToWishList(productId).subscribe({
        next: res => {
          this.isFavorite = true;
          this.isRed = true;
          this.toastr.success(res.message, '', {
            timeOut: 3000,
            positionClass: 'toast-bottom-right',
            progressBar: true,
          })
        }
      })
    }
  }

  removeProductFromWishList(productId: string) {
    this._WishListServices.removeProductToWishList(productId).subscribe({
      next: res => {
        this.isFavorite = false;
        this.isRed = false;
        this.toastr.success(res.message, '', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
          progressBar: true,
        })
      }
    })
  }

  changeColor() {
    this.isRed = !this.isRed;
  }

  toggleWishlist(productId: string) {
    if (localStorage.getItem("userToken")) {
      if (this.isFavorite || this.isRed) {
        this.removeProductFromWishList(productId);
      } else {
        this.addProductToWishList(productId);
      }
    } else {
      this._Router.navigate(['/login'])
    }
  }
}
