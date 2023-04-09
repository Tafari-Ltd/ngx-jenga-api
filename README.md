
# Project Title

An Angular library that abstracts the complexity of consuming Jenga APIs

## Documentation

API reference: 
[Documentation](https://developer.jengaapi.io/reference/welcome)

## Features

- Get All EazzyPay Merchants
- Get All Billers
- Receive Payments - Bill Payments
- Receive Payments - Merchant Payments


## Run in your project

Install the library

```bash
  npm i ngx-jenga-api
```

In your `app.module.ts` or any module where the component or directive would be used like so:

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

Install dependencies

```bash
  ng add @angular/material
```

Implement in your application

```html
  <jenga-all-merchants></jenga-all-merchants> // Get All EazzyPay Merchants

  <jenga-all-billers ></jenga-all-billers> // Get All Billers

  <jenga-bill-payments></jenga-bill-payments> // Receive Payments - Bill Payments

  <jenga-merchant-payments></jenga-merchant-payments> // Receive Payments - Merchant Payments
```

## API Reference

For table  only

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `@Input(): showSearchBar` | `string` | enable search bar |
| `@Input(): tableShadow` | `string` |  add box-shadow |








s