import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserServices} from "../user.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../shared/notification.service";

@Component({
  selector: 'app-add-credits',
  templateUrl: './add-credits.component.html',
  styleUrls: ['./add-credits.component.scss']
})
export class AddCreditsComponent implements OnInit {

  addCreditsForm: FormGroup;

  constructor(private userService: UserServices,
              private router: Router,
              private notifyService: NotificationService) { }

  ngOnInit() {
    this.addCreditsForm = new FormGroup({
      credits: new FormControl('', [<any>Validators.required])
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
