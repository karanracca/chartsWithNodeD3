import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { UserServices } from "../user.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../shared/notification.service";

// /** Error when invalid control is dirty, touched, or submitted. */
// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})

export class ForgotPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;

  constructor(private userService: UserServices,
              private router: Router,
              private notifyService: NotificationService) { }

  ngOnInit() {
    this.resetPasswordForm = new FormGroup({
      emailFormControl: new FormControl('', [Validators.required, Validators.email])
    });
  }

  // matcher = new MyErrorStateMatcher();

  getEmailErrorMessage() {
    return this.resetPasswordForm.controls.email.hasError('required') ? 'You must enter a value' :
      this.resetPasswordForm.controls.email.hasError('email') ? 'Not a valid email' : '';
  }

  resetPassword(credentials: {emailFormControl}, isValid: boolean) {
    if (isValid) {
      this.userService.resetPassword(credentials.emailFormControl).subscribe((data: any) => {
        this.notifyService.notification.next(data.message);
        this.router.navigate(['/login']);
      },error => {
        this.notifyService.notification.next(error);
      });
    }
  }
}
