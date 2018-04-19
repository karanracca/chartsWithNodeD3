import { Component, OnInit, Input } from '@angular/core';
import {ChartService} from '../charts.service';

@Component({
  selector: 'app-chart-result',
  templateUrl: './chart-result.component.html',
  styleUrls: ['./chart-result.component.scss']
})
export class ChartResultComponent implements OnInit {

  @Input() chartData: any;

  chartName = '';
  showChartNameError = false;

  constructor( private chartServices: ChartService) { }

  ngOnInit() {}

  saveChart() {
    if (this.chartName.length <= 0) {
     this.showChartNameError = true;
     return;
    } else {
      this.showChartNameError = false;
      this.chartServices.saveGeneratedChart(this.chartData).subscribe((result) => {
        console.log(result);
      });
    }


  }


}
