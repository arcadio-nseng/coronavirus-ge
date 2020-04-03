import {Component, Input, OnInit, Output} from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  @Input() firstLabel: string;
  @Input() secondLabel: string;
  @Input() firstData: number;
  @Input() secondData: number;

// Doughnut
  public doughnutChartLabels: Label[];
  public doughnutChartData: MultiDataSet;
  public doughnutChartType: ChartType = 'doughnut';

  constructor() { }

  ngOnInit() {
    this.doughnutChartLabels = [this.firstLabel, this.secondLabel];
    this.doughnutChartData = [[this.firstData, this.secondData]];
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
