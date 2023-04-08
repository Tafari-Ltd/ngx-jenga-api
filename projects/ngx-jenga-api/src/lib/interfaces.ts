import { FormControl, FormGroup } from "@angular/forms"

interface baseLink {
    myUrl: URL,
    myAuthUrl: URL
}
const link = new URL('https://uat.finserve.africa/v3-apis/transaction-api/v3.0')
const authLink = new URL('https://uat.finserve.africa/authentication/api/v3/authenticate/merchant')
export const BaseURL: baseLink = {
  myUrl: link,
  myAuthUrl: authLink
}


export interface IauthReq {
    merchantCode: string
    consumerSecret: string
}


export interface IauthRes {
    accessToken: string
    refreshToken: string
    expiresIn: string
    issuedAt: string
    tokenType: string
}


export interface IrecbillPayments {
    biller: {
        billerCode: string
        countryCode: string
    },
    bill: {
        reference: string
        amount: string
        currency: string
    },
    payer: {
        name: string
        account: string
        reference: string
        mobileNumber: string
    },
    partnerId: string
    remarks: string
}


export interface IBillForm extends FormGroup {
    value: IrecbillPayments,
    controls: {
        billerCode: FormControl
        countryCode: FormControl
        reference: FormControl
        amount: FormControl
        currency: FormControl
        name: FormControl
        account: FormControl
        reference2: FormControl
        mobileNumber: FormControl
        partnerId: FormControl
        remarks: FormControl
    }
}


export interface IrecMerchantPayments {
    biller: {
        billerCode: string
        countryCode: string
    }
    bill: {
        reference: string
        amount: string
        currency: string
    }
    payer: {
        name: string
        account: string
        reference: string
        mobileNumber: string
    }
    partnerId: string
    remarks: string
}


export interface IMerchantForm extends FormGroup {
    value: IrecMerchantPayments
    controls: {
        billerCode: FormControl
        countryCode: FormControl
        reference: FormControl
        amount: FormControl
        currency: FormControl
        name: FormControl
        account: FormControl
        reference2: FormControl
        mobileNumber: FormControl
        partnerId: FormControl
        remarks: FormControl
    }
}


export interface IMerchantPayments {
    merchant: {
        till: string
      },
      payment: {
        ref: string
        amount: string
        currency: string
      },
      partner: {
        id: string
        ref: string
      }
}

export interface IMerchantPaymentsForm  extends FormGroup {
    value: IMerchantPayments 
    controls: {
        till: FormControl
        ref: FormControl
        amount: FormControl
        currency: FormControl
        id: FormControl
        ref2: FormControl
    }
}



