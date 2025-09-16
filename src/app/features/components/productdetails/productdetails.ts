import { productDetails } from './../../interfaces/productDetailsInterface';
import { Component, PLATFORM_ID, OnInit, Inject, Input } from '@angular/core';
import { ProductsDetailsServices } from '../../services/productDetailsServices/product-details-services';
import { ActivatedRoute, Router } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Auth } from '../../../core/services/auth/auth';
import { WishListServices } from '../../wishListServices/wish-list-services';
import { CartServices } from '../../services/cartServices/cart-services';
import { isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-productdetails',
  imports: [CarouselModule],
  templateUrl: './productdetails.html',
  styleUrl: './productdetails.scss'
})
export class Productdetails implements OnInit {
  productDetailsData!: productDetails;
  imagesList!: string[];
  isRed: boolean = false;
  isFavorite: boolean = false;
  constructor(private toastr: ToastrService, public _Auth: Auth, private _WishListServices: WishListServices, private _Router: Router, @Inject(PLATFORM_ID) private platformId: Object, private _ProductsDetailsServices: ProductsDetailsServices, private _ActivatedRoute: ActivatedRoute, private _CartServices: CartServices) { }

  ngOnInit(): void {
    this.checkFavouriteItems();
    this.displayProductDetails();
  }
  displayProductDetails() {
    this._ActivatedRoute.params.subscribe({
      next: res => {
        this._ProductsDetailsServices.getProductDetails(res['productId']).subscribe({
          next: res => {
            this.productDetailsData = res.data;
            this.imagesList = res.data.images;
            this.checkFavouriteItems();
          }
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
            progressBar:true,
          })
        }
      })
    }

  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    rtl:true,
    navText: ['<i class="fa-solid fa-arrow-right"></i>', '<i class="fa-solid fa-arrow-left"></i>'],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: true
  }

  checkFavouriteItems() {
    if (isPlatformBrowser(this.platformId) && localStorage.getItem("userToken") && this.productDetailsData?._id) {
      this._WishListServices.getProductOnWishList().subscribe({
        next: res => {
          const wishlistProducts = res.data;
          const found = wishlistProducts.find((product: any) => product._id === this.productDetailsData._id);
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

  addProductToWishList(productId: string) {
    if (isPlatformBrowser(this.platformId) && localStorage.getItem("userToken")) {
      this._WishListServices.appProductToWishList(productId).subscribe({
        next: res => {
          this.isFavorite = true;
          this.isRed = true;
          this.toastr.success(res.message, '', {
            timeOut: 3000,
            positionClass: 'toast-bottom-right',
            progressBar:true,
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
          progressBar:true,
        })
      }
    })
  }

  changeColor() {
    this.isRed = !this.isRed;
  }

  toggleWishlist(productId: string) {
    if (isPlatformBrowser(this.platformId) && localStorage.getItem("userToken")) {
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
