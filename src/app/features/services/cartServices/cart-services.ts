import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { enviroment } from '../../../core/enviroment/baseData';
import { cartRestonse } from '../../interfaces/cart';

@Injectable({
  providedIn: 'root'
})
export class CartServices {
  productCartNumber:BehaviorSubject<number>=new BehaviorSubject<number>(0);


  constructor(private _HttpClient: HttpClient) {

  }

  getCartProducts(): Observable<cartRestonse> {
    return this._HttpClient.get<cartRestonse>(`${enviroment.baseUrl}/api/v1/cart`)
    ;
  }

  addProductToCart(productId: string): Observable<any> {
    return this._HttpClient.post<any>(`${enviroment.baseUrl}/api/v1/cart`, { productId })
    ;
  }

  updateProductQuantity(productId: string, count: string): Observable<cartRestonse> {
    return this._HttpClient.put<cartRestonse>(`${enviroment.baseUrl}/api/v1/cart/${productId}`, { count })
  }

  removeSpecificProduct(productId: string): Observable<cartRestonse> {
    return this._HttpClient.delete<cartRestonse>(`${enviroment.baseUrl}/api/v1/cart/${productId}`)
  }

  clearAllProduct(): Observable<cartRestonse> {
    return this._HttpClient.delete<cartRestonse>(`${enviroment.baseUrl}/api/v1/cart`)
  }
}

