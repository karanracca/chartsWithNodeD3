import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {NotificationService} from './Shared/notification.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor( private snackBar: MatSnackBar, private notifyService: NotificationService) {
  }

  ngOnInit() {
    this.notifyService.notification.subscribe((message: string) => {
      this.openSnackBar(message);
    });
  }

  openSnackBar(msg: string) {
    this.snackBar.open(msg, ' ', {
      duration: 3000,
    });
  }
}
