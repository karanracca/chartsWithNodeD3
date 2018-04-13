import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';
import {User} from './user.model';
import {UserServices} from '../user.service';
import {Router} from '@angular/router';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserServices, private router: Router) { }

  signupForm: FormGroup;


  getEmailErrorMessage() {
    return this.signupForm.controls.email.hasError('required') ? 'You must enter a value' :
      this.signupForm.controls.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPhoneErrorMessage() {
    return this.signupForm.controls.phone.hasError('required') ? 'You must enter a value' :
      this.signupForm.controls.phone.hasError('pattern') ? 'Not a valid Number' : '';

  }

  onSubmit(user: User, isValid: boolean) {
    if (isValid) {
      console.log(user);
        this.userService.createUser(user).subscribe(data => {
           this.router.navigate(['/login']);
        });
    }
  }



  ngOnInit() {
    this.signupForm = new FormGroup({
      firstname: new FormControl('', [<any>Validators.required]),
      lastname: new FormControl('', [<any>Validators.required]),
      email: new FormControl('', [<any>Validators.required, <any>Validators.email]),
      phone: new FormControl('', [<any>Validators.required,
        <any>Validators.pattern(/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/)]),
      username: new FormControl('', [<any>Validators.required]),
      password: new FormControl('', [<any>Validators.required, <any>Validators.minLength(8)]),
    });
  }



}
