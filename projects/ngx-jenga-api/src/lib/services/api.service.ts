import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseURL, IMerchantPayments, IrecbillPayments, IrecMerchantPayments } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor(
    private api: HttpClient
  ) { }

// ***************************GET REQUESTS***************************


  // Get All EazzyPay Merchants
  getAllEazzyPayMerchants(page:number, per_page:number): Observable<any> {
    let params = new HttpParams()
    .set('page', page)
    .set('per_page', per_page)

    return this.api.get(`${BaseURL.myUrl}/merchants`, { params })
  }

  // Get All Billers
  getAllBillers(page:number, per_page:number, category:string): Observable<any> {
    let params = new HttpParams()
    .set('page', page)
    .set('per_page', per_page)
    .set('category', category)

    return this.api.get(`${BaseURL.myUrl}/billers`, { params })
  }




// ***************************POST REQUESTS***************************


  // Receive Payments - Bill Payments
  receiveBillPayments(data:IrecbillPayments): Observable<IrecbillPayments> {
    return this.api.post<IrecbillPayments>(`${BaseURL.myUrl}/bills/pay`, data)
  }

  // Receive Payments - Merchant Payments
  receiveMerchantPayments(data:IMerchantPayments): Observable<IrecMerchantPayments> {
    return this.api.post<IrecMerchantPayments>(`${BaseURL.myUrl}/tills/pay`, data)
  }


}
