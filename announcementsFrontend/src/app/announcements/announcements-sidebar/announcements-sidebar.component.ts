import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

import {AnnouncementService} from '../announcement.service';

@Component({
  selector: 'app-announcements-sidebar',
  templateUrl: './announcements-sidebar.component.html',
  styleUrls: ['./announcements-sidebar.component.scss']
})
export class AnnouncementsSidebarComponent implements OnInit {

  allCharts: Array<any> = [];
  emailFormControl: FormControl;

  constructor(private annService: AnnouncementService) { }

  ngOnInit() {
    this.emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);

    this.annService.getAllCharts().subscribe((result: any) => {
      this.allCharts = result.payload;
    });
  }

}
