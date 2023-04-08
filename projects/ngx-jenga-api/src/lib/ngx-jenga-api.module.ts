import { ErrorHandler, ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// configs
import { JENGA_API_KEYS } from './jenga.keys';
import { ApiKeyInterceptor } from './interceptors/api-key.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { GlobalErrorHndler } from './error-handler/global-error-handler';
import { ErrorInterceptor } from './interceptors/error.interceptor';

// components
import { NgxJengaApiComponent } from './ngx-jenga-api.component';
import { MerchantsComponent } from './components/merchants/merchants.component';
import { BillPaymentsComponent } from './components/bill-payments/bill-payments.component';
import { MerchantPaymentsComponent } from './components/merchant-payments/merchant-payments.component';
import { BillersComponent } from './components/billers/billers.component';

// material
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [
    NgxJengaApiComponent,
    MerchantsComponent,
    BillPaymentsComponent,
    MerchantPaymentsComponent,
    BillersComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,

    // material
    MatProgressBarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSnackBarModule, 
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatCardModule,
    FormsModule
  ],
  exports: [
    NgxJengaApiComponent,
    MerchantsComponent,
    BillPaymentsComponent,
    MerchantPaymentsComponent,
    BillersComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ApiKeyInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHndler },
    // { 
    //   provide: APP_INITIALIZER, 
    //   useFactory: (authAPI: AuthService) => () => 
    //   authAPI.authenticateMerchant().subscribe({
    //       next: (res:any) => {
    //         console.log("RES IS: ", res)
    //         localStorage.setItem('jenga-tkn', res.accessToken)
    //       },
    //       error: (e:any) => {
    //         console.error("Error is: ", e)
    //       }
    //     }), 
    //   deps: [AuthService], multi: true
    // }
  ]
})
export class NgxJengaApiModule { 
  static forRoot(
    merchant_code: string, 
    consumer_secret: string,
    api_key: string
    ): ModuleWithProviders<NgxJengaApiModule> {
    return {
      ngModule: NgxJengaApiModule,
      providers: [
        { 
          provide: JENGA_API_KEYS, 
          useValue: 
          { 
            merchant_code, 
            consumer_secret, 
            api_key 
          } 
        }
      ]
    }
  }
}
