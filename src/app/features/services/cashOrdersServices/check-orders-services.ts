import { ShippingAddress } from './../../interfaces/cashOrdersInterface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { enviroment } from '../../../core/enviroment/baseData';

@Injectable({
  providedIn: 'root'
})
export class CheckOrdersServices {
  constructor(private _HttpClient:HttpClient){}
  cashOrder(ShippingAddress:ShippingAddress,cartId:string):Observable<any>{
    return this._HttpClient.post<ShippingAddress>(`${enviroment.baseUrl}/api/v1/orders/${cartId}`,
      {
        ShippingAddress:ShippingAddress,
      },
      {
        headers:{
          token:localStorage.getItem("userToken")||""
        }
      }
    )
  }
  onlinePaymentOrder(ShippingAddress:ShippingAddress,cartId:string):Observable<any>{
    return this._HttpClient.post<ShippingAddress>(`${enviroment.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${enviroment.domain}`,
      {
        ShippingAddress:ShippingAddress,
      },
      {
        headers:{
          token:localStorage.getItem("userToken")||""
        }
      }
    )
  }

}
