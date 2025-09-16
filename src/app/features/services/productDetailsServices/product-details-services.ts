import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../core/enviroment/baseData';
import { Observable } from 'rxjs';
import { productDetailsResponse } from '../../interfaces/productDetailsInterface';

@Injectable({
  providedIn: 'root'
})
export class ProductsDetailsServices {
  constructor(private _HttpClient:HttpClient){}
  getProductDetails(product_Id:string):Observable<productDetailsResponse>{
    return this._HttpClient.get<productDetailsResponse>(`${enviroment.baseUrl}/api/v1/products/${product_Id}`)
  }
}
