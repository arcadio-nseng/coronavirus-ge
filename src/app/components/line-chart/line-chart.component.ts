import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ChartDataSets, ChartOptions, PositionType} from 'chart.js';
import { BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  public lineChartColors: Array < any > = [{
    backgroundColor: ['red'],
    // borderColor: ['rgba(135,206,250,1)', 'rgba(106,90,205,1)']
  }];

  @Input() colors: string[];
  @Input() titleConfig: { display: boolean, text: string } = {display: false, text: ''};
  @Input() legendConfig: { display: boolean, position: PositionType } = {display: false, position: 'bottom'};

  @Input() lineChartData: ChartDataSets[] = [
    { data: [], label: 'Confirmados', fill: true },
    { data: [], label: 'Recuperados', fill: true },
    { data: [], label: 'Fallecidos', fill: false }
  ];
  @Input() lineChartLabels: Label[] = ['1 Mar', '2 Mar',  '3 Mar',  '4 Mar',  '5 Abr',  '6 Abr',  '7 Abr', ];
  public lineChartOptions: ChartOptions;

  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor() { }

  ngOnInit() {

    this.lineChartColors = [{
        backgroundColor: [this.colors[1]],
        borderColor: [this.colors[0]]
    }];

    let previousDay = 13; //utilizado para controlar el eje de los meses

    this.lineChartOptions = {
      responsive: true,
      scales: {
        // We use this empty structure as a placeholder for dynamic theming.
        /*xAxes: [
          {
            id:'x1',
            type:"category",
            ticks:{
              callback:function(label: string){
                let day = label.split(" ")[0];
                // var year = label.split(";")[1];
                return day;
              }
            }
          },
          {
            id: 'x2',
            type: "category",
            gridLines: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
            ticks: {
              callback: function (label: string) {
                let day = label.split(" ")[0];
                let month = label.split(" ")[1];
                if ( Number(day) === 3 ) {
                  return month;
                } else {
                  previousDay = Number(day);
                  return "";
                }
              }
            }
          }
        ],*/
        yAxes: [
          {
            ticks: {
              min: 0,
              stepSize: 1,
              beginAtZero: true
            }
          },
        ]
      },
      legend: {
        display: this.legendConfig.display,
        position: this.legendConfig.position,
        align: 'center'
      },
      plugins: {
        datalabels: {
          display: false,
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
