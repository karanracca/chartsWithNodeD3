import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-file-selector',
  template: `<input type="file" (change)="onSelectFile($event)" >`,
  styleUrls: ['./file-selector.component.scss']
})
export class FileSelectorComponent implements OnInit {

  data: any;

  constructor() { }

  @Output() onFileSelected = new EventEmitter<any>();

  ngOnInit() {}

  onSelectFile(event) {
    console.log(event.target.files);
    this.onFileSelected.emit(event.target.files[0]);
  }

}
