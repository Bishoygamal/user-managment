import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { AppRoutingModule } from './/app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserListComponent } from './user-list/user-list.component';
import {SidebarModule} from 'ng-sidebar';
import { SideNavComponent } from './side-nav/side-nav.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ToastrModule } from 'ng6-toastr-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserListComponent,
    SideNavComponent,
    NavbarComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SidebarModule.forRoot(),
    ToastrModule.forRoot(),
    BrowserAnimationsModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
