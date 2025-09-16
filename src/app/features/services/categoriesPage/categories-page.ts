import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { categoriesResponse } from '../../interfaces/categories';
import { enviroment } from '../../../core/enviroment/baseData';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesPage {
      constructor(private _HttpClient:HttpClient){}
    displayAllCategories():Observable<categoriesResponse>{
      return this._HttpClient.get<categoriesResponse>(`${enviroment.baseUrl}/api/v1/categories`)
    }
}
