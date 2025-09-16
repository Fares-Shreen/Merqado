import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { productsResponse } from '../../interfaces/products';
import { enviroment } from '../../../core/enviroment/baseData';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsServices {
    constructor(private _HttpClient: HttpClient){}
    
  displayProductsAtHomePage1(): Observable<productsResponse>{
    return this._HttpClient.get<productsResponse>(`${enviroment.baseUrl}/api/v1/products`);
  }
  
  displayProductsAtHomePage2(): Observable<productsResponse>{
    return this._HttpClient.get<productsResponse>(`${enviroment.baseUrl}/api/v1/products?page=2`);
  }
}
