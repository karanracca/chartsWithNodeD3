import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { LoginComponent } from '../userservices/login/login.component';

const appRoutes: Routes = [

  { path: '', redirectTo: '/welcome', pathMatch: 'full'},

  { path: 'welcome', component: LoginComponent }

];

@NgModule({
  imports: [ RouterModule, RouterModule.forRoot(appRoutes, {enableTracing: true})],
  exports: [ RouterModule ]
})

export class RoutingModule { }
