import {  Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { products } from '../../interfaces/products';
import { ProductCard } from '../../../shared/components/productCard/product-card/product-card';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Homeslider } from '../homeslider/homeslider';
import { ProductsServices } from '../../services/productsServices/products-services';
import { Categoryslider } from '../categoryslider/categoryslider';
import { SearchPipPipe } from '../../../shared/pipe/searchPip/search-pip-pipe';
import { zoomInLeftOnEnterAnimation } from 'angular-animations';
@Component({
  selector: 'app-home',
  imports: [ProductCard,CarouselModule,Homeslider,Categoryslider,FormsModule,SearchPipPipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
    animations: [
  zoomInLeftOnEnterAnimation({ duration: 3500 }),
  ]
})
export class Home implements OnInit {
  constructor(
    private _ProductsServices: ProductsServices,
    
  ) {}
  searchItems:string='';
  productListOfPage1:products[] = []; 
  productListOfPage2:products[] = [];
 
  ngOnInit(): void {
  this.displayProductsAtHomePage1();
  this.displayProductsAtHomePage2();

  }
  displayProductsAtHomePage1(){
    this._ProductsServices.displayProductsAtHomePage1().subscribe({
      next: res => {
        this.productListOfPage1 = res.data;
        
      },
      error: err => {
        console.error('Error loading products page 1:', err);
        this.productListOfPage1 = [];
        
      }
    })
  }
  
  displayProductsAtHomePage2(){
    this._ProductsServices.displayProductsAtHomePage2().subscribe({
      next: res => {
        this.productListOfPage2 = res.data;
        
      },
      error: err => {
        console.error('Error loading products page 2:', err);
        this.productListOfPage2 = [];
        
      }
    })
  }


  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    rtl:true,
    navText: [ '1',
    '2'],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: true
    
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
