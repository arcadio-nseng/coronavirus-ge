import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {Title} from "@angular/platform-browser";
import {ItemData, TableData} from "../../interfaces/interfaces";
import {ChartDataSets} from "chart.js";

@Component({
  selector: 'app-confirmed',
  templateUrl: './confirmed.component.html',
  styleUrls: ['./confirmed.component.css']
})
export class ConfirmedComponent implements OnInit {


  districtData: { name: string, value: number }[] = [];
  mapScale = {
    '0': '#02DBFF', //cero casos
    '1-10': '#FFA225', //uno a diez casos
    '>10': '#FF8C44', //más de diez casos
  };
  mapRegionValues: any;
  loading = true;
  lineChartLabels: string[] = [];
  lineChartData: ChartDataSets[] = [
    {data: [], label: 'Confirmados', fill: true}
  ];
  barChartLabels: string[] = [];
  barChartDataSet: any[] = [
    {data: [], label: 'Nuevos casos', backgroundColor: '#FFA225'},
  ];
  barChartAccumulatedDataSet: any[] = [
    {data: [], label: 'Nuevos casos', backgroundColor: '#FFA225'},
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

    this.lineChartLabels = this.dataService.confirmedData.reportDates;
    this.dataService.bindDataLabels(this.lineChartLabels, this.lineChartData, this.dataService.confirmed);
    this.barChartLabels = this.dataService.lastFewDays;
    this.dataService.bindDataLabels(this.barChartLabels, this.barChartDataSet, this.dataService.confirmed);
    this.dataService.bindDataLabels(this.lineChartLabels, this.barChartAccumulatedDataSet,
      this.dataService.confirmed, true);
    this.tableData = this.dataService.getTableData(this.dataService.confirmed);

    this.dataService.setDistrictData(this.districtData, this.dataService.confirmedData.regions);

    this.mapRegionValues = this.dataService.getRegionColors(this.dataService.confirmedData.regions)

    this.loading = false;

  }


}
