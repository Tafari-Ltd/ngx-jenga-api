import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BaseURL, IauthReq } from '../interfaces';
import { map, Observable } from 'rxjs';
import { JENGA_API_KEYS } from '../jenga.keys';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpClient: HttpClient

  constructor(
    handler: HttpBackend,
    @Inject(JENGA_API_KEYS) private token:any
  ) {
    this.httpClient = new HttpClient(handler)
   }

  authenticateMerchant(): Observable<IauthReq> {
    const httpOptions = {
      headers: new HttpHeaders({
        'API-Key': `${this.token.api_key}`
      })
    }

    return this.httpClient.post<IauthReq>(`${BaseURL.myAuthUrl}`, {
      merchantCode: this.token.merchant_code,
      consumerSecret: this.token.consumer_secret,
    }, httpOptions ).pipe(map((res:any) => {
      this.isAuthenticated() == true
      return res
    }))
  }

  isAuthenticated(): boolean {
    return false
  }
}
