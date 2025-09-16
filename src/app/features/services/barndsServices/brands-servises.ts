import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { barndsResponse } from '../../interfaces/barndsInterface';
import { enviroment } from '../../../core/enviroment/baseData';

@Injectable({
  providedIn: 'root'
})
export class BrandsServises {
  constructor(private _HttpClient:HttpClient){}
  getAllBrandsPage1():Observable<barndsResponse>{
    return this._HttpClient.get<barndsResponse>(`${enviroment.baseUrl}/api/v1/brands`)
  }
    getAllBrandsPage2():Observable<barndsResponse>{
    return this._HttpClient.get<barndsResponse>(`${enviroment.baseUrl}/api/v1/brands?page=2`)
  }
}
