import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import {UserServices} from '../../userservices/user.service';
import {CreditsService} from '../../shared/credits.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(private router: Router,
              private userService: UserServices,
              private creditsService: CreditsService) { }

  user: any;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.creditsService.updateCredits.subscribe(() => {
      this.updateCredits();
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  updateCredits() {
    this.userService.getCredits().subscribe(userObject => {
      this.user = userObject;
    });
  }

  updateForm() {
    this.router.navigate(['/welcome/updateAccount']);
  }
}
