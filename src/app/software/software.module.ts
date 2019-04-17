import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SoftwareRoutingModule } from './software-routing.module';
import { SoftwareRouterActivate } from './software.router.activate';


import { LayoutComponent } from './layout/layout.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { LibraryComponent } from './library/library.component';
import { UsersComponent } from './users/users.component';
import { BookComponent } from './book/book.component';
import { HeaderComponent } from './header/header.component';
import { TrnBorrowInComponent } from './trn-borrow-in/trn-borrow-in.component';
import { TrnBorrowOutComponent } from './trn-borrow-out/trn-borrow-out.component';
import { TrnReserveComponent } from './trn-reserve/trn-reserve.component';


import { MatSidenavModule } from '@angular/material/sidenav';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WjGridFilterModule } from 'wijmo/wijmo.angular2.grid.filter';
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    LayoutComponent,
    SidenavComponent,
    LibraryComponent,
    UsersComponent,
    BookComponent,
    HeaderComponent,
    TrnBorrowInComponent,
    TrnBorrowOutComponent,
    TrnReserveComponent
  ],
  imports: [
    CommonModule,
    SoftwareRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    WjGridFilterModule,
    WjGridModule,
    WjInputModule,
    ModalModule.forRoot(),
  ],
  providers: [
    SoftwareRouterActivate
  ]
})
export class SoftwareModule { }
