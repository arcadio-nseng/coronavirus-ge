import {Component, Input, OnInit} from '@angular/core';
import {ChartLegendOptions, ChartOptions, ChartType} from 'chart.js';
import {MultiDataSet, Label, Colors} from 'ng2-charts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  @Input() labels: string[];
  @Input() data: number[];
  @Input() colors: string[];
  @Input() titleConfig: {display: boolean, text: string} = {display: false, text: ''};
  @Input() legendConfig: ChartLegendOptions = {display: true, position: 'top'};

// Doughnut
  public doughnutChartLabels: Label[];
  public doughnutChartData: MultiDataSet;
  public doughnutChartType: ChartType = 'doughnut';
  public pieChartOptions: ChartOptions;
  public pieChartColors: Colors[] = [{
    backgroundColor: ['red', 'yellow'],
    // borderColor: ['rgba(135,206,250,1)', 'rgba(106,90,205,1)']
  }];

  constructor() { }

  ngOnInit() {
    this.doughnutChartLabels = this.labels;
    this.doughnutChartData = [this.data];
    this.pieChartColors = [{
      backgroundColor: this.colors
    }];
    this.pieChartOptions = {
      plugins: {
        datalabels: {
          color: '#ffffff',
          formatter: (value, ctx) => {
            let sum = 0;
            let dataArr = ctx.chart.data.datasets[0].data;
            for (let i = 0; i < dataArr.length; i++) sum += Number(dataArr[i]);
            return Math.round((value*100 / sum)) + "%";
            // return percentage;
          }
        }
      },
      title: this.titleConfig,
      legend: this.legendConfig,
    }
  }

}
