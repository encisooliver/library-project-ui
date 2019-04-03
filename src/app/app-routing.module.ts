import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './account/account.module#AccountModule' },
  { path: 'account', loadChildren: './account/account.module#AccountModule' },
  { path: 'software', loadChildren: './software/software.module#SoftwareModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
