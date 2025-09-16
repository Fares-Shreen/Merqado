import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../core/enviroment/baseData';
import { Observable } from 'rxjs';
import { categoriesResponse } from '../../interfaces/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesServices {
    constructor(private _HttpClient:HttpClient){}
    displayAllCategories():Observable<categoriesResponse>{
      return this._HttpClient.get<categoriesResponse>(`${enviroment.baseUrl}/api/v1/categories`)
    }
}
