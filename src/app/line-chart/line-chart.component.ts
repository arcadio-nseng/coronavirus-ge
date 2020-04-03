import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  @Input() confirmed: number[] = [];
  @Input() recovered: number[] = [];
  @Input() deaths: number[] = [];

  @Input() lineChartData: ChartDataSets[] = [
    { data: this.confirmed, label: 'Confirmados', fill: true },
    { data: this.recovered, label: 'Recuperados', fill: true },
    { data: this.deaths, label: 'Fallecidos', fill: false }
  ];
  @Input() lineChartLabels: Label[] = ['1 Mar', '2 Mar',  '3 Mar',  '4 Mar',  '5 Abr',  '6 Abr',  '7 Abr', ];
  public lineChartOptions: ChartOptions  = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          ticks: {
            min: 0,
            stepSize: 1
          }
        },
      ]
    },
  };

  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor() { }

  ngOnInit() {
    console.log(this.confirmed);
    console.log(this.deaths);
    console.log(this.recovered);
  }



}
