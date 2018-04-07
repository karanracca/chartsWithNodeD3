import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { SingupComponent } from './userservices/singup/singup.component';
import { LoginComponent } from './userservices/login/login.component';
import { RoutingModule } from './Shared/routing.module';
import { StylingModule } from './Shared/style.module';
import { LandingPageComponent } from './landing/landing-page/landing-page.component';
import {AppConstants} from './Shared/appConstants';
import {UserServices} from './userservices/user.service';



@NgModule({
  declarations: [
    AppComponent,
    SingupComponent,
    LoginComponent,
    LandingPageComponent
  ],
  imports: [
    HttpClientModule,
    StylingModule,
    RoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [
    UserServices,
    AppConstants
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
