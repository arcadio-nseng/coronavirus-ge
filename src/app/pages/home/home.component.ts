import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {Title} from "@angular/platform-browser";
import {DistrictData, ItemData, TableData} from "../../interfaces/interfaces";
import {ChartDataSets} from "chart.js";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  districtData: DistrictData[] = [];
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
  /*barChartDataSet: any[] = [
    {data: [], label: 'Nuevos casos', backgroundColor: '#FFA225'},
  ];*/
  barChartAccumulatedDataSet: any[] = [
    {data: [], label: 'Confirmados', backgroundColor: '#FFA225'},
  ];
  bundleBarchartDataSet: any[] = [
    {data: [], label: 'Activos', backgroundColor: '#6C757D'},
    {data: [], label: 'Recuperados', backgroundColor: '#28A745'},
    {data: [], label: 'Fallecidos', backgroundColor: '#DC3545'},
  ];
  // tableData: DistrictData[] = [];

  constructor(public dataService: DataService, private titleService: Title) {
    // titleService.setTitle('Coronavirus (COVID-19) en Guinea Ecuatorial');
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

    this.lineChartLabels = this.dataService.getMainLineChartLabels();
    this.dataService.bindDataLabels(this.lineChartLabels, this.lineChartData, this.dataService.confirmed);
    // this.barChartLabels = this.dataService.lastFewDays;
    // this.dataService.bindDataLabels(this.barChartLabels, this.barChartDataSet, this.dataService.confirmed);
    /*this.dataService.bindDataLabels(this.dataService.reportDates, this.barChartAccumulatedDataSet,
      null, true);*/
    this.barChartAccumulatedDataSet[0].data = this.dataService.getAccumulatedDataSet(this.dataService.confirmedData.reportDates,
      this.dataService.confirmed);

    this.bundleBarchartDataSet[1].data = this.dataService.getAccumulatedDataSet(this.dataService.deathsRecoveredDates,
      this.dataService.recovered);
    this.bundleBarchartDataSet[2].data = this.dataService.getAccumulatedDataSet(this.dataService.deathsRecoveredDates,
      this.dataService.deaths);


    let activesData = this.dataService.getActivesAccumulatedDataSet();
    this.dataService.recoveredData.reportDates.forEach(date => {
      this.bundleBarchartDataSet[0].data.push(activesData[this.dataService.reportDates.findIndex(d => d === date)]);
    });
    this.bundleBarchartDataSet[0].data.push(activesData[activesData.length - 1]);


    this.dataService.setDistrictData(this.districtData, null);

    this.mapRegionValues = this.dataService.getRegionColors(this.dataService.confirmedData.regions);


    this.dataService.reportDates.forEach(date => {

    })

    this.loading = false;



  }


}
