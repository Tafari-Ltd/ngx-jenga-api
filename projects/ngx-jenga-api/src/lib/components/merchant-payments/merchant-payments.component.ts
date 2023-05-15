import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { IMerchantPayments, IrecMerchantPayments } from '../../interfaces';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'jenga-merchant-payments',
  templateUrl: './merchant-payments.component.html',
  styleUrls: ['./merchant-payments.component.css']
})
export class MerchantPaymentsComponent implements OnInit, OnDestroy {

  destroyComponent = new Subject<void>()
  merchantForm!: FormGroup
  paymentData!: IMerchantPayments

  @Input() till!: string
  @Input() uniqueRef: string = this.general.generateRandomString(12)
  @Input() amount!: string
  @Input() currency: string = 'KES'
  @Input() bankId!: string
  @Input() mobileNumber!: string

  
  constructor(
    private api: ApiService,
    private general: GeneralService,
    private formbuilder: FormBuilder,
    private authenticateEndpoint: AuthService
  ){
    this.authenticateEndpoint.authenticateMerchant().subscribe({
      next: (res:any) => {
        localStorage.setItem('jenga-tkn', res.accessToken)
      },
      error: (e:any) => {
        throw new Error(e.error.message)
      }
    })
  }

  ngOnInit(): void {
    this.merchantForm = this.formbuilder.group({
      till: [this.till, [Validators.required]],
      uniqueRef: [this.uniqueRef, [Validators.required]],
      amount: [this.amount, [Validators.required]],
      currency: [this.currency, [Validators.required]],
      bankId: [this.bankId, [Validators.required]],
      mobileNumber: [this.mobileNumber, [Validators.required]],
    })
  }

  ngOnDestroy(): void {
    this.destroyComponent.next()
    this.destroyComponent.complete()
  }

  
  merchantPayments(): void {
    const data: IMerchantPayments = {
      merchant: {
        till: this.merchantForm.value.till
      },
      payment: {
        ref: this.merchantForm.value.uniqueRef,
        amount: this.merchantForm.value.amount,
        currency: this.merchantForm.value.currency
      },
      partner: {
        id: this.merchantForm.value.bankId,
        ref: this.merchantForm.value.mobileNumber
      }
    }
    this.api.receiveMerchantPayments(data).pipe(
      takeUntil(this.destroyComponent)).subscribe({
        next: (res:any) => {
          console.log(res)
        },
        error: (e:any) => {
          throw new Error(e.error.message)
        }
      })
  }
}
