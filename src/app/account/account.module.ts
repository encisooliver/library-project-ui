import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

import { ToastrModule } from 'ngx-toastr';

import { HttpClientModule } from '@angular/common/http';
import { AccountLayoutComponent } from './account-layout/account-layout.component';


@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    AccountLayoutComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule
  ]
  
})
export class AccountModule { }
