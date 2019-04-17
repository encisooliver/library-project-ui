import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { UsersComponent } from './users/users.component';
import { BookComponent } from './book/book.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { LibraryComponent } from './library/library.component';
import { TrnBorrowOutComponent } from './trn-borrow-out/trn-borrow-out.component';
import { TrnBorrowInComponent } from './trn-borrow-in/trn-borrow-in.component';
import { TrnReserveComponent } from './trn-reserve/trn-reserve.component';

import { SoftwareRouterActivate } from './software.router.activate';



const routes: Routes = [
  {
    path: '', component: LayoutComponent, canActivate: [SoftwareRouterActivate],
    children: [
      { path: 'user', component: UsersComponent, canActivate: [SoftwareRouterActivate] },
      { path: 'book', component: BookComponent, canActivate: [SoftwareRouterActivate] },
      { path: 'sidenav', component: SidenavComponent, canActivate: [SoftwareRouterActivate] },
      { path: 'library', component: LibraryComponent, canActivate: [SoftwareRouterActivate] },
      { path: 'trn-borrow-in', component: TrnBorrowInComponent, canActivate: [SoftwareRouterActivate] },
      { path: 'trn-borrow-out', component: TrnBorrowOutComponent, canActivate: [SoftwareRouterActivate] },
      { path: 'trn-reserve', component: TrnReserveComponent, canActivate: [SoftwareRouterActivate] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SoftwareRoutingModule { }
