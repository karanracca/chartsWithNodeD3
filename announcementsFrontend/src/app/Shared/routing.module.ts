import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { LoginComponent } from '../userservices/login/login.component';
import {SignupComponent} from "../userservices/signup/signup.component";
import {ForgotPasswordComponent} from "../userservices/forgot-password/forgot-password.component";

const appRoutes: Routes = [

  { path: '', redirectTo: '/welcome', pathMatch: 'full'},

  { path: 'welcome', component: LoginComponent },

  { path: 'signup', component: SignupComponent },

  { path: 'forgot-password', component: ForgotPasswordComponent}

];

@NgModule({
  imports: [ RouterModule, RouterModule.forRoot(appRoutes, {enableTracing: true})],
  exports: [ RouterModule ]
})

export class RoutingModule { }
