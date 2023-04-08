import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { NgxJengaApiModule } from 'dist/ngx-jenga-api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    NgxJengaApiModule.forRoot(
    '1065896418',
    'Rxk4Z375lGel6zO0m7e09STKBkYhZ4',
    'l3ljU9vQ1gb5fxaDSfJOh0NtkweUz4wOLWwhgfOaiWdZv8bVGCmJtUyKzgn2Fn9jHoOMkTtEve0rpFjTyol+Vw=='
    ),
      BrowserAnimationsModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
