import { Component, OnInit } from '@angular/core';

import {AnnouncementService} from '../announcement.service';

@Component({
  selector: 'app-announcements-sidebar',
  templateUrl: './announcements-sidebar.component.html',
  styleUrls: ['./announcements-sidebar.component.scss']
})
export class AnnouncementsSidebarComponent implements OnInit {

  allCharts: Array = [];

  constructor(private annService: AnnouncementService) { }

  ngOnInit() {
    this.annService.getAllCharts().subscribe((result: any) => {
      this.allCharts = result.payload;
    });
  }

}