import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { AccountLayoutComponent } from './account-layout/account-layout.component';
import { AppRouterActivate } from '../app.router.active';

const routes: Routes = [
  { path: '', component: AccountLayoutComponent, canActivate: [AppRouterActivate],
    children: [
      { path: 'sign-in', component: SignInComponent, canActivate: [AppRouterActivate] },
      { path: '', component: SignInComponent, canActivate: [AppRouterActivate]  }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
  
})
export class AccountRoutingModule { }
