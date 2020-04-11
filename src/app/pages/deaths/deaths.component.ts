import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {ChartDataSets} from "chart.js";
import {TableData} from "../../interfaces/interfaces";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-deaths',
  templateUrl: './deaths.component.html',
  styleUrls: ['./deaths.component.css']
})
export class DeathsComponent implements OnInit {

  districtData: { name: string, value: number }[] = [];
  mapScale = {
    '0': '#02DBFF', //cero casos
    '1-10': '#E967A4', //uno a diez casos
    '>10': '#C33E2C', //más de diez casos
  };
  mapRegionValues: any;
  loading = true;
  lineChartLabels: string[] = [];
  lineChartData: ChartDataSets[] = [
    {data: [], label: 'Confirmados', fill: true}
  ];
  barChartLabels: string[] = [];
  barChartDataSet: any[] = [
    {data: [], label: 'Nuevos casos', backgroundColor: '#DC3545'},
  ];
  barChartAccumulatedDataSet: any[] = [
    {data: [], label: 'Nuevos casos', backgroundColor: '#DC3545'},
  ];
  tableData: TableData[] = [];

  constructor(private dataService: DataService, private titleService: Title) {
    titleService.setTitle('Casos confirmados de COVID-19 en Guinea Ecuatorial');
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

    this.lineChartLabels = this.dataService.deathsData.reportDates;
    this.dataService.bindDataLabels(this.lineChartLabels, this.lineChartData, this.dataService.deaths);
    this.barChartLabels = this.dataService.lastFewDays;
    this.dataService.bindDataLabels(this.barChartLabels, this.barChartDataSet, this.dataService.deaths);
    this.dataService.bindDataLabels(this.lineChartLabels, this.barChartAccumulatedDataSet,
      this.dataService.deaths, true);
    this.tableData = this.dataService.getTableData(this.dataService.deaths);

    this.dataService.setDistrictData(this.districtData, this.dataService.deathsData.regions);

    this.mapRegionValues = this.dataService.getRegionColors(this.dataService.deathsData.regions)

    this.loading = false;

  }

}
