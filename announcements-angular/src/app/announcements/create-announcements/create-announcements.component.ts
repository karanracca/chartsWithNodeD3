import { Component, OnInit } from '@angular/core';
import {AnnouncementService} from '../announcement.service';
import {NotificationService} from '../../shared/notification.service';
import {MatDialog} from '@angular/material';
import {ModelBoxComponent} from '../../shared/model-box/model-box.component';
import {CreditsService} from '../../shared/credits.service';

@Component({
  selector: 'app-create-announcements',
  templateUrl: './create-announcements.component.html',
  styleUrls: ['./create-announcements.component.scss']
})
export class CreateAnnouncementsComponent implements OnInit {

  receivers: Array<string> = [];
  editorText = null;
  constructor(private announceService: AnnouncementService,
              private notify: NotificationService,
              private dialog: MatDialog,
              private creditsService: CreditsService) { }

  ngOnInit() {
  }

  onReceivers(object) {
    this.receivers = object;
  }

  setEditorText(text) {
    this.editorText = text;
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(ModelBoxComponent, {
      width: '250px'
    });
  }

  createAnnouncement() {

    if (this.receivers.length === 0) {
      this.notify.notification.next('Please select receivers for the announcement');

      return;
    }

    if (this.editorText === null || this.editorText === 'Enter content here...') {
      this.notify.notification.next('Please enter content for announcement');
      return;
    }

    this.announceService.createAnnouncement(this.receivers, this.editorText).subscribe((data: any) => {
      this.notify.notification.next(data.message);
      this.openDialog();
      this.creditsService.updateCredits.next();
    });
  }
}
