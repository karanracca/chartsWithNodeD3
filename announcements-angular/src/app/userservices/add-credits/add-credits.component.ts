import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserServices} from "../user.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../shared/notification.service";
import {CreditsService} from "../../shared/credits.service";

@Component({
  selector: 'app-add-credits',
  templateUrl: './add-credits.component.html',
  styleUrls: ['./add-credits.component.scss']
})
export class AddCreditsComponent implements OnInit {

  addCreditsForm: FormGroup;

  constructor(private userService: UserServices,
              private router: Router,
              private notifyService: NotificationService,
              private creditsService: CreditsService) { }

  user: any;

  ngOnInit() {
    this.addCreditsForm = new FormGroup({
      credits: new FormControl('', [<any>Validators.required])
    });

      this.user = JSON.parse(localStorage.getItem('user'));
      this.creditsService.updateCredits.subscribe(() => {
          this.updateCredits();
      });
  }

    updateCredits() {
        this.userService.getCredits().subscribe(userObject => {
            this.user = userObject;
        });
    }

  addCredits(creds: {credits}, isValid: boolean) {
    if (isValid) {
      this.userService.addCredits(creds.credits).subscribe((data: any) => {
        this.notifyService.notification.next(data.message);
        this.router.navigate(['/welcome']);
      }, error => {
        this.notifyService.notification.next(error);
      });
    }
  }

}
