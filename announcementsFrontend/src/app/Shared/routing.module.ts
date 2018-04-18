import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from '../userservices/login/login.component';
import {SignupComponent} from '../userservices/signup/signup.component';
import {ForgotPasswordComponent} from '../userservices/forgot-password/forgot-password.component';
import {LandingPageComponent} from '../welcome/landing-page/landing-page.component';
import {BarChartComponent} from '../charts/bar-chart/bar-chart.component';
import {LineChartComponent} from "../charts/line-chart/line-chart.component";
import {CreateChartComponent} from '../charts/create-chart/create-chart.component';
import {AuthGard} from './auth-gaurd.service';

const appRoutes: Routes = [

  {path: '', redirectTo: '/login', pathMatch: 'full'},

  {path: 'login', component: LoginComponent},

  {path: 'signup', component: SignupComponent},

  {path: 'forgotPassword', component: ForgotPasswordComponent},

  {
    path: 'welcome', component: LandingPageComponent, canActivate: [AuthGard] , children: [
      {path: '', pathMatch: 'full', redirectTo: 'createCharts'},
      {path: 'createCharts', component: CreateChartComponent},
      {path: 'createBarCharts', component: BarChartComponent},
      {path: 'createLineCharts', component: LineChartComponent},
      {path: 'createPieCharts', component: CreateChartComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule, RouterModule.forRoot(appRoutes, {enableTracing: true})],
  exports: [RouterModule]
})

export class RoutingModule {}
