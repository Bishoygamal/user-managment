import { NgModule } from '@angular/core';

import {RouterModule,Routes} from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import {UserListComponent} from './user-list/user-list.component';

const appRoutes:Routes = [
  {path:'',component:UserLoginComponent},
  {path:'user-list',component:UserListComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
