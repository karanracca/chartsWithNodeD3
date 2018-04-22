import { Component, OnInit } from '@angular/core';
import {AnnouncementService} from '../announcement.service';

@Component({
  selector: 'app-editor-area',
  templateUrl: './editor-area.component.html',
  styleUrls: ['./editor-area.component.scss']
})
export class EditorAreaComponent implements OnInit {

  constructor(private announceService: AnnouncementService) { }

  editorContent = 'Enter announcement content here!!!';

  ngOnInit() {
  }

  createAnnouncement() {
    this.announceService.createAnnouncement(this.editorContent).subscribe((data: any) => {
      console.log(data);
    });
  }

}
