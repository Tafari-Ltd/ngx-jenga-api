import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBillForm, IrecbillPayments } from '../../interfaces';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'jenga-bill-payments',
  templateUrl: './bill-payments.component.html',
  styleUrls: ['./bill-payments.component.css']
})
export class BillPaymentsComponent implements OnInit {

  billForm!: FormGroup
  paymentData!: IrecbillPayments

  @Input() billerCode!: string
  @Input() countryCode!: string
  @Input() reference!: string
  @Input() amount!: string
  @Input() currency: string = 'KES'
  @Input() name!: string
  @Input() account!: string
  @Input() reference2!: string
  @Input() partnerId!: string
  @Input() authorization!: string
  @Input() signature!: string
  @Input() mobileNumber!: string
  @Input() remarks!: string
  @Input() cardShadow: boolean = true


  constructor(
    private api: ApiService,
    private gs: GeneralService,
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
    this.billForm = this.formbuilder.group({
      billerCode: [this.billerCode, [Validators.required]],
      countryCode: [this.countryCode, [Validators.required]],
      reference: [this.reference, [Validators.required]],
      amount: [this.amount, [Validators.required]],
      currency: [this.currency, [Validators.required]],
      name: [this.name, [Validators.required]],
      account: [this.account, [Validators.required]],
      reference2: [this.gs.generateRandomString(12), [Validators.required]],
      partnerId: [this.partnerId, [Validators.required]],
      mobileNumber: [this.mobileNumber, [Validators.required]],
      remarks: [this.remarks, [Validators.required]],
    }) as IBillForm
  }

  billPayments(): void {
    this.paymentData = {
      biller: {
        billerCode: this.billForm.value.billerCode,
        countryCode: this.billForm.value.countryCode
      },
      bill: {
        reference: this.billForm.value.reference,
        amount: this.billForm.value.amount,
        currency: this.billForm.value.currency
      },
      payer: {
        name: this.billForm.value.name,
        account: this.billForm.value.reference,
        reference: this.billForm.value.reference2,
        mobileNumber: this.billForm.value.mobileNumber
      },
      partnerId: this.billForm.value.partnerId,
      remarks: this.billForm.value.remarks
    }
    this.api.receiveBillPayments(this.paymentData).subscribe({
      next: (res:any) => {
        console.log("Bill payment is: ", res)
      },
      error: (e:any) => {
        throw new Error(e.error.message)
      }
    })
  }

}
