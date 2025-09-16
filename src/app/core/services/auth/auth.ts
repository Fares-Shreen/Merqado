import { afterNextRender, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { forgetPasswordInterface, loginInterface, registerationInterface, updatePasswordInterface } from '../../interfaces/auth';
import { enviroment } from '../../enviroment/baseData';
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  userDataDetails!:any;
  userId!:string;
  userData:BehaviorSubject<null|JwtPayload>=new BehaviorSubject<null|JwtPayload>(null);
  constructor(private _HttpClient: HttpClient ,private _Router:Router,) { 
        afterNextRender(()=>{
      ;
      if (localStorage.getItem("userToken")) {
        this.decodedData();
      }
    });
  
  }
  register(registrationData: registerationInterface): Observable<any> {
    return this._HttpClient.post<registerationInterface>(`${enviroment.baseUrl}/api/v1/auth/signup`, registrationData);
  }
  login(loginData: loginInterface): Observable<any> {
    return this._HttpClient.post<loginInterface>(`${enviroment.baseUrl}/api/v1/auth/signin`, loginData);
  }
  decodedData() {
    const token = localStorage.getItem("userToken")!;
    const decoded = jwtDecode(token);
    this.userData.next(decoded);
    this.userDataDetails=this.userData;
    this.userId=this.userDataDetails._value.id
    localStorage.setItem("userId",this.userId)
    
    
  }
  logout(){
    localStorage.removeItem("userToken");
    this.userData.next(null);
    this._Router.navigate(["/login"])
 ;
  }
  forgetPassword(forgetPasswordData:forgetPasswordInterface):Observable<any>{
    return this._HttpClient.post<forgetPasswordInterface>(`${enviroment.baseUrl}/api/v1/auth/forgotPasswords`,forgetPasswordData)
  }
  resetCode(resetCodeData:string):Observable<string>{
    return this._HttpClient.post<string>(`${enviroment.baseUrl}/api/v1/auth/verifyResetCode`,resetCodeData)
  }
  resetPassword(resetPasswordData:loginInterface):Observable<any>{
    return this._HttpClient.put(`${enviroment.baseUrl}/api/v1/auth/resetPassword`,resetPasswordData)
  }
  updatePassword(updatePasswordData:updatePasswordInterface):Observable<any>{
    return this._HttpClient.put(`${enviroment.baseUrl}/api/v1/users/changeMyPassword`,updatePasswordData,{
      headers:{
        token:localStorage.getItem("userToken")||""
      }
    })
  }

}
