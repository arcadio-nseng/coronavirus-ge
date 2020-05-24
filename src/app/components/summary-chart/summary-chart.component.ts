import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-summary-chart',
  templateUrl: './summary-chart.component.html',
  styleUrls: ['./summary-chart.component.css']
})
export class SummaryChartComponent implements OnInit {
  @Input() confirmed: number = 0;
  @Input() recovered: number = 0;
  @Input() deaths: number = 0;
  @Input() sourced = false;
  actives: number = 0

  constructor() { }

  ngOnInit() {
    this.actives = this.confirmed - this.recovered - this.deaths;
  }

}
