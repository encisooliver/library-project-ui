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
import { AppRouterActivate } from '../app.router.active';



const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: 'user', component: UsersComponent },
      { path: 'book', component: BookComponent },
      { path: 'sidenav', component: SidenavComponent },
      { path: 'library', component: LibraryComponent, },
      { path: 'trn-borrow-in', component: TrnBorrowInComponent },
      { path: 'trn-borrow-out', component: TrnBorrowOutComponent },
      { path: 'trn-reserve', component: TrnReserveComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SoftwareRoutingModule { }
