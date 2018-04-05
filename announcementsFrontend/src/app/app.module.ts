import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {FormsModule} from "@angular/forms";
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import {MatIconModule} from "@angular/material";
import { AppComponent } from './app.component';
import { SingupComponent } from './userservices/singup/singup.component';
import { LoginComponent } from './userservices/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    SingupComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
