import { SearchPipPipe } from './../../../shared/pipe/searchPip/search-pip-pipe';
import { Component, OnInit } from '@angular/core';
import { products } from '../../interfaces/products';
import { ProductCard } from '../../../shared/components/productCard/product-card/product-card';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { zoomInLeftOnEnterAnimation } from 'angular-animations';
import { ProductsServices } from '../../services/productsServices/products-services';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCard, CarouselModule, SearchPipPipe, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.scss',
      animations: [
  zoomInLeftOnEnterAnimation({ duration: 3500 }),
  ]
})
export class Products implements OnInit {
  constructor(
    private _ProductsServices: ProductsServices,
  ) { }
  searchItems: string = '';
  productListOfPage1: products[] = [];
  productListOfPage2: products[] = [];
  ngOnInit(): void {
    this.scrollToTop()
    this.displayProductsAtHomePage1();
    this.displayProductsAtHomePage2()
  }
  public customOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    rtl:true,
    navSpeed: 700,
    navText: ['1', '2'],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: true
  }
  displayProductsAtHomePage1() {
    this._ProductsServices.displayProductsAtHomePage1().subscribe({
      next: res => {
        this.productListOfPage1 = res.data;
      },
      error: err => {

      }
    })
  }

  displayProductsAtHomePage2() {
    this._ProductsServices.displayProductsAtHomePage2().subscribe({
      next: res => {
        this.productListOfPage2 = res.data;
      },
      error: err => {
      }
    })
  }
  scrollToTop() {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
}
