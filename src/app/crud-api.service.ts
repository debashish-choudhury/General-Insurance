import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CRUDApiService {


  public loginstatus = new BehaviorSubject<boolean>((sessionStorage.length!=0)?true:false);

  get isLoggedin()
  {
    return this.loginstatus.asObservable();
  }

  private apiServer = "http://localhost:64977/api";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  create(ruser): Observable<RegisterUser> {
    return this.httpClient.post<RegisterUser>(this.apiServer + '/Register/', JSON.stringify(ruser), this.httpOptions)
  }

  check(luser): Observable<any> {
    return this.httpClient.post<any>(this.apiServer + '/Login/', JSON.stringify(luser), this.httpOptions)
  }

  getbrandsapi(vehtype): Observable<any> {
    return this.httpClient.post<any>(this.apiServer + '/RamBuyCheck/', JSON.stringify(vehtype), this.httpOptions)
  }
  
  getmodelsapi(vehtypebrandid): Observable<any> {
    return this.httpClient.post<any>(this.apiServer + '/RamBuyCheck2/', JSON.stringify(vehtypebrandid), this.httpOptions)
  }

}

export class RegisterUser {
  User_id: String;
  Name: String;
  Email_ID: String;
  Phone_No: Number;
  DOB: Date;
  Address: String;
  Password: String;
}

export class LoginUser
{
  Email_ID:string;
  Password:string;
  message: string;
}

// export class brands
// {
//   vehicle_type:string;
//   brand_names:string;
//   Brand_Id:number;

// }