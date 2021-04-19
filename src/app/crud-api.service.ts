import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { WheelerBrand, WheelerModel } from './buy-insurance/buy-insurance.component';

import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, retry} from 'rxjs/operators';

import { fakeAsync } from '@angular/core/testing';
import { ClaimInfo} from './claim-info'


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
    return this.httpClient.post<RegisterUser>(this.apiServer + '/Register/', JSON.stringify(ruser), this.httpOptions).pipe(catchError(this.handleError));
  }

  check(luser): Observable<any> {
    return this.httpClient.post<any>(this.apiServer + '/Login/', JSON.stringify(luser), this.httpOptions)
  }

  getBrands(VehicleType): Observable<any>{
    return this.httpClient.post<any>(this.apiServer + '/BrandName/', JSON.stringify(VehicleType), this.httpOptions)
  }

  getModels(ModelType): Observable<any>{
    return this.httpClient.post<any>(this.apiServer + '/ModelName/', JSON.stringify(ModelType), this.httpOptions)
  }

  mail(muser): Observable<any> {
    return this.httpClient.post<any>(this.apiServer + '/Mail/', JSON.stringify(muser), this.httpOptions)
  }

  reset_pwd(fuser): Observable<any> {
    return this.httpClient.post<any>(this.apiServer + '/Reset_pwd/', JSON.stringify(fuser), this.httpOptions)
  }

  claim(clins): Observable<claiminsurance> {
    return this.httpClient.post<claiminsurance>(this.apiServer + '/ClaimInsurance/', JSON.stringify(clins), this.httpOptions);
  }

  getadminclaims(): Observable<any> {
    return this.httpClient.get<any>(this.apiServer + '/Admin/')
  }

  getdetailsById(Claim_no): Observable<any> {
    const opts = { params: new HttpParams({fromString: "Claim_no="+ Claim_no}) };
    return this.httpClient.get<any>(this.apiServer + '/Admin?Claim_no='+Claim_no)
  }

  updateclaims(Claim_no,claim_info): Observable<any>{
    return this.httpClient.put<any>(this.apiServer + '/Admin?Claim_no='+Claim_no, JSON.stringify(claim_info), this.httpOptions)
  }

  subscriptionPlan_details(User_Id): Observable<any>{
    return this.httpClient.post<any>(this.apiServer + '/Subscription?User_Id='+User_Id, JSON.stringify(User_Id), this.httpOptions)
  }
  claim_details(User_Id): Observable<any>{
    return this.httpClient.post<any>(this.apiServer + '/ClaimHistory?User_Id='+User_Id, JSON.stringify(User_Id), this.httpOptions)
  }

  handleError(error)
  {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent)
    {
      errorMessage = `Error: ${error.error.message}`;
    }
    else
    {
      errorMessage = `Email Id or Phone Number is already taken`;
    }

    window.alert(errorMessage);
    return throwError(errorMessage);
  }
  

  getbrandsapi(vehtype): Observable<any> {
    return this.httpClient.post<any>(this.apiServer + '/BrandName/', JSON.stringify(vehtype), this.httpOptions)
  }
  
  getmodelsapi(vehtypebrandid): Observable<any> {
    return this.httpClient.post<any>(this.apiServer + '/ModelName/', JSON.stringify(vehtypebrandid), this.httpOptions)
  }

  getpremfacors(premamtobj): Observable<any> {
    return this.httpClient.post<any>(this.apiServer + '/PremiumAmount/', JSON.stringify(premamtobj), this.httpOptions)
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

export class Mailuser
{
  Email_ID : string;
  message : string;
}
export class reset_pwd
{
  token : string;
  password : string;
  //cpassword : string;
}
// export class brands
// {
//   vehicle_type:string;
//   brand_names:string;
//   Brand_Id:number;

// }

export class claiminsurance
{
  Policy_No : string;
  Reasons : string;
  Date_claimed : Date;
  Date_of_Loss : Date;
  Place_of_Loss : string;
  Damage_Description : string;
  Injury_to_Thirdparty : number;
  Claim_approval_status : string;
  Claim_amt : number;
}

export class Subscription_plan
{
  Vehicle_Type : string;
  Manufacturer_Name : string;
  Model_Name : string;
  Reg_No : string;
  Engine_No : number;
  Chasis_No : number;
  Sub_date : Date;
  Policy_No : number;
}
