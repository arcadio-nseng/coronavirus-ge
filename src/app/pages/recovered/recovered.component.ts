import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {ChartDataSets} from "chart.js";
import {TableData} from "../../interfaces/interfaces";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-recovered',
  templateUrl: './recovered.component.html',
  styleUrls: ['./recovered.component.css']
})
export class RecoveredComponent implements OnInit {

  districtData: { name: string, value: number }[] = [];
  mapScale = {
    '0': '#02DBFF', //cero casos
    '1-10': '#96CE7A', //uno a diez casos
    '>10': '#156D61', //más de diez casos
  };
  mapRegionValues: any;
  loading = true;
  lineChartLabels: string[] = [];
  lineChartData: ChartDataSets[] = [
    {data: [], label: 'Confirmados', fill: true}
  ];
  barChartLabels: string[] = [];
  barChartDataSet: any[] = [
    {data: [], label: 'Nuevos casos', backgroundColor: '#28A745'},
  ];
  barChartAccumulatedDataSet: any[] = [
    {data: [], label: 'Nuevos casos', backgroundColor: '#28A745'},
  ];
  tableData: TableData[] = [];

  constructor(public dataService: DataService, private titleService: Title) {
    titleService.setTitle('Pacientes recuperados de COVID-19 en Guinea Ecuatorial');
  }

  ngOnInit(): void {
    this.init();
  }

  init () {

    if (this.dataService.dataReady) this.loadData();
    else this.dataService.requestData().subscribe(data => {
      this.dataService.setData(data);
      this.loadData();
    });

  }

  private loadData () {

    this.lineChartLabels = this.dataService.recoveredData.reportDates;
    this.dataService.bindDataLabels(this.lineChartLabels, this.lineChartData, this.dataService.recovered);
    this.barChartLabels = this.dataService.lastFewDays;
    this.dataService.bindDataLabels(this.barChartLabels, this.barChartDataSet, this.dataService.recovered);
    this.dataService.bindDataLabels(this.lineChartLabels, this.barChartAccumulatedDataSet,
      this.dataService.recovered, true);
    this.tableData = this.dataService.getTableData(this.dataService.recovered, true);

    this.dataService.setDistrictData(this.districtData, this.dataService.recoveredData.regions);

    this.mapRegionValues = this.dataService.getRegionColors(this.dataService.recoveredData.regions)

    this.loading = false;

  }

}
