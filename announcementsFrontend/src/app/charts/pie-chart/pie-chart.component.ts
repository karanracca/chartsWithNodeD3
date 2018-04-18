import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PapaParseService} from 'ngx-papaparse';
import { ChartService } from '../charts.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class PieChartComponent implements OnInit {

  pieChartForm: FormGroup;
  fileData: any;
  file: File;
  showDataFields = false;
  html: any;

  constructor(private papa: PapaParseService, private chartService: ChartService) { }

  ngOnInit() {
    this.pieChartForm = new FormGroup({
      xaxis: new FormControl('', [<any>Validators.required]),
      yaxis: new FormControl('', [<any>Validators.required]),
    });
  }

  onSubmit(selectedValues , isValid: boolean) {
    if (isValid && selectedValues.xaxis !== selectedValues.yaxis) {
      console.log(selectedValues);
      this.chartService.createPieChart(selectedValues, this.file).subscribe((data) => {
        console.log(data);
        this.html = `data:image/png;base64,${data.payload}`;
      });
    }
  }

  getData (file) {
    return new Promise((resolve, reject) => {
      this.papa.parse(file, {
        header: true,
        error: (error) => reject(error),
        complete: (data) => resolve(data)
      });
    });
  }

  onFileSelected(file) {
    this.file = file;
    this.getData(file).then(data => {
      this.fileData = data;
      console.log('File Data', this.fileData);
      this.showDataFields = true;
    });
  }

}
