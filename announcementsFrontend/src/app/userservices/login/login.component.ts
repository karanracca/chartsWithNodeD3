import { Component, OnInit } from '@angular/core';
import {UserServices} from '../user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private userService: UserServices, private router: Router) { }

  ngOnInit() { }

  login() {
    this.userService.login(this.username, this.password).subscribe((data) => {
      console.log(data);
      localStorage.setItem("secretkey", data.token);
      this.router.navigate(['/landing']);
    });
  }
}
