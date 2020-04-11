import {Component, Input, OnInit} from '@angular/core';
import {ChartOptions, ChartType, ChartDataSets, PositionType} from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  public barChartOptions: ChartOptions;
  @Input() titleConfig: { display: boolean, text: string } = {display: false, text: ''};
  @Input() legendConfig: { display: boolean, position: PositionType } = {display: false, position: 'bottom'};
  @Input() barChartLabels: Label[] = [
    '20 Mar, 2020',
    '21 Mar, 2020',
    '22 Mar, 2020',
    '23 Mar, 2020',
    '24 Mar, 2020',
    '25 Mar, 2020',
    '26 Mar, 2020',
  ];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  @Input() barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40, 30], label: 'Nuevos casos' },
    { data: [28, 48, 40, 19, 86, 27, 90, 12], label: 'Recuperados' }
  ];

  constructor() { }

  ngOnInit() {
    this.barChartOptions = {
      responsive: true,
      // We use these empty structures as placeholders for dynamic theming.
      scales: {
        xAxes: [{}],
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 1
          }
        }]
      },
      legend: {
        display: this.legendConfig.display,
        position: this.legendConfig.position
      },
      plugins: {
        datalabels: {
          anchor: 'end',
          align: 'end',
        }
      },
      title: {
        display: this.titleConfig.display,
        text: this.titleConfig.text,
        padding: 20
      }

    };
  }





}
