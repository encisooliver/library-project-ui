import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppSetting } from './app-setting';
import { AppRouterActivate } from './app.router.active';





@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-top-left',
      preventDuplicates: true,
      progressBar: true
    }), // ToastrModule added
    HttpClientModule,
    ModalModule.forRoot(),

  ],
  providers: [
    AppSetting,
    AppRouterActivate
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
