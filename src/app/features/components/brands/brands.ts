import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { barnd } from '../../interfaces/barndsInterface';
import { BrandsServises } from '../../services/barndsServices/brands-servises';
 import { zoomInLeftOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './brands.html',
  styleUrl: './brands.scss',
    animations: [
  zoomInLeftOnEnterAnimation({ duration: 3500 }),
  ]
})
export class Brands implements OnInit {
  barndsList1!: barnd[];
  barndsList2!: barnd[];
  constructor(private _BrandsServises: BrandsServises ) { }
  ngOnInit(): void {
    this.scrollToTop()
    this.displayBrandsPage1();
    this.displayBrandsPage2();
  }
  displayBrandsPage1() {
    this._BrandsServises.getAllBrandsPage1().subscribe({
      next: res => {
        this.barndsList1 = res.data;
        
      }
    })
  }
    displayBrandsPage2() {
    this._BrandsServises.getAllBrandsPage2().subscribe({
      next: res => {
        this.barndsList2 = res.data;
        
      }
    })
  }
  public customOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    rtl:true,
    navText: ['1', '2'],
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
