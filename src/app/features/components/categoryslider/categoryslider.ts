import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesServices } from '../../services/categoriesSliderServices/categories-services';
import { category } from '../../interfaces/categories';
@Component({
  selector: 'app-categoryslider',
  imports: [CarouselModule],
  templateUrl: './categoryslider.html',
  styleUrl: './categoryslider.scss'
})
export class Categoryslider implements OnInit {
  categoresList: category[] = [];
  constructor(
    private _CategoriesServices: CategoriesServices,
    private _ChangeDetectorRef: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
  this.displayAllcategories();
  }
  displayAllcategories(){
    this._CategoriesServices.displayAllCategories().subscribe({
      next: res => {
        this.categoresList = res.data;
        this._ChangeDetectorRef.detectChanges();
      },
      error: err => {
        console.error('Error loading categories:', err);
      }
    })
  }
 customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    rtl:true,
    autoplay:true,
    autoplayTimeout:3000,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    
    nav: true
  }
}
