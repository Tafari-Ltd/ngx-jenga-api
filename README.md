
# ngx-jenga-api

An Angular library that abstracts the complexity of consuming Jenga APIs

## Documentation
Before proceeding with the library, ensure you are familiar with Jenga APIs. See below for the docs.

[Documentation](https://developer.jengaapi.io/reference/welcome)


## Features

- Get All EazzyPay Merchants
- Get All Billers
- Receive Payments - Bill Payments
- Receive Payments - Merchant Payments


## Run in your project

Install the library


```ts
npm i ngx-jenga-api
```
    

In your ```app.module.ts``` or any module where the component or directive would be used like so:



```ts
import { NgxJengaApiModule } from 'ngx-jenga-api';

  imports: [
     NgxJengaApiModule.forRoot(
      <merchant code>,
      <consumer secret>,
      <API key>
    )
  ]
```

Install the dependencies


```bash
ng add @angular/material
```

## API Reference

#### Receive Payments - Merchant Payments

This API Provides Partners the Capability To Make Payments For Goods And Services



```bash
  <jenga-merchant-payments></jenga-merchant-payments>
```

| Parameter | Type     | Value                |
| :-------- | :------- | :------------------------- |
| `till` | `string` | **Required**. `Undefined` |
| `uniqueRef` | `string` | **Required**. `random 12 digit string` |
| `amount` | `string` | **Required**. `Undefined` |
| `currency` | `string` | **Required**. `KES` |
| `bankId` | `string` | **Required**. `Undefined` |
| `mobileNumber` | `string` | **Required**. `Undefined` |
| `mobileNumber` | `string` | **Required**. `Undefined` |

#### Receive Payments - Bill Payments
This API Provides Partners the Capability To Initiate Utility Bill Payments For Goods And Services

```html
  <jenga-bill-payments></jenga-bill-payments>
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `billerCode`      | `string` | **Required**. `Undefined` |
| `countryCode`      | `string` | **Required**. `Undefined` |
| `reference`      | `string` | **Required**. `Undefined` |
| `amount`      | `string` | **Required**. `Undefined` |
| `currency`      | `string` | **Required**. `KES` |
| `name`      | `string` | **Required**. `Undefined` |
| `account`      | `string` | **Required**. `Undefined` |
| `reference2`      | `string` | **Required**. `random 12 digit string` |
| `partnerId`      | `string` | **Required**. `Undefined` |
| `authorization`      | `string` | **Required**. `Undefined` |
| `signature`      | `string` | **Required**. `Undefined` |
| `mobileNumber`      | `string` | **Required**. `Undefined` |
| `remarks`      | `string` | **Required**. `Undefined` |
| `cardShadow`      | `boolean` | **Required**. `false` |

#### Get All EazzyPay Merchants

Returns all EazzyPay merchants.
```html
  <jenga-all-merchants></jenga-all-merchants>
```

| Parameter | Type     | Value                |
| :-------- | :------- | :------------------------- |
| `tableShadow` | `string` | **Required**. `true` |
| `showSearchBar` | `string` | **Required**. `true` |

#### Get All Billers

Returns a paginated list of all billers
```html
  <jenga-all-merchants></jenga-all-merchants>
```

| Parameter | Type     | Value                |
| :-------- | :------- | :------------------------- |
| `tableShadow` | `string` | **Required**. `true` |
| `showSearchBar` | `string` | **Required**. `true` |
| `categories` | `string` | **Required**. `utilities` |




## Tech Stack

**Client:** Angular, Angular Material, SCSS

