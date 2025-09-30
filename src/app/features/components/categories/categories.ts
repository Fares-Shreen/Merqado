import {  Component, OnInit } from '@angular/core';
import { category } from '../../interfaces/categories';
import { CategoriesPage } from '../../services/categoriesPage/categories-page';
import { zoomInLeftOnEnterAnimation } from 'angular-animations';
@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
    animations: [
  zoomInLeftOnEnterAnimation({ duration: 3500 }),
  ]
})
export class Categories implements OnInit {
  categoresList: category[] = [];

  constructor(
    private _CategoriesPage: CategoriesPage,
    
  ) {}

  ngOnInit(): void {
    this.scrollToTop()
    this.displayAllCategoriesInPage();
  }

  displayAllCategoriesInPage() {
    this._CategoriesPage.displayAllCategories().subscribe({
      next: res => {
        this.categoresList = res.data;
      },
      error: err => {
        console.error(err);
      }
    });
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
