import { Component, OnInit } from '@angular/core';
import {UserServices} from '../user.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private userService: UserServices, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [<any>Validators.required]),
      password: new FormControl('', [<any>Validators.required, Validators.minLength(8)])
    });
  }

  getPasswordError() {
    return this.loginForm.controls.password.hasError('required') ? 'Password is required' :
      this.loginForm.controls.password.hasError('minlength') ? 'Password should be minimum 8 characters long' : '';

  }

  login(credentials: {username, password}, isValid: boolean) {
    this.userService.login(credentials.username, credentials.password).subscribe((data: any) => {
      console.log(data);
      localStorage.setItem('secretToken', data.token);
      this.router.navigate(['/welcome']);
    });
  }
}
