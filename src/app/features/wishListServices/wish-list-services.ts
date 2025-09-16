import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { enviroment } from '../../core/enviroment/baseData';
import { wishListResponse } from '../interfaces/wishListInterFace';

@Injectable({
  providedIn: 'root'
})
export class WishListServices {
  constructor(private _HttpClient:HttpClient){}
  

  
  appProductToWishList(productId:string):Observable<any>{
    return this._HttpClient.post<any>(`${enviroment.baseUrl}/api/v1/wishlist`,{
      productId:productId
    },)
  }
    removeProductToWishList(productId:string):Observable<any>{
    return this._HttpClient.delete<any>(`${enviroment.baseUrl}/api/v1/wishlist/${productId}`)
  }
    getProductOnWishList():Observable<wishListResponse>{
    return this._HttpClient.get<wishListResponse>(`${enviroment.baseUrl}/api/v1/wishlist`
)
  }

  loadWishlist(): Observable<wishListResponse> {
    return this.getProductOnWishList()
  }


}
