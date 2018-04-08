import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './userservices/login/login.component';
import { RoutingModule } from './Shared/routing.module';
import { StylingModule } from './Shared/style.module';
import { LandingPageComponent } from './landing/landing-page/landing-page.component';
import { SignupComponent } from './userservices/signup/signup.component';

import {AppConstants} from './Shared/appConstants';
import {UserServices} from './userservices/user.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingPageComponent,
    SignupComponent
  ],
  imports: [
    HttpClientModule,
    StylingModule,
    RoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    UserServices,
    AppConstants
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}
