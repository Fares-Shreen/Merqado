import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ordersDetails } from '../../interfaces/userOrders';
import { enviroment } from '../../../core/enviroment/baseData';

@Injectable({
  providedIn: 'root'
})
export class UserOrderServices {
  constructor(private _HttpClient:HttpClient){}
  usersOrders(userId:string):Observable<ordersDetails[]>{
   return this._HttpClient.get<ordersDetails[]>(`${enviroment.baseUrl}/api/v1/orders/user/${userId}`, {
      headers: {
        token: localStorage.getItem("userToken") || ""
      }
    })
  }
}
