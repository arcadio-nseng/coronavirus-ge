import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {Title} from "@angular/platform-browser";
import {DistrictData} from "../../interfaces/interfaces";
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
    '>10': '#BB2124', //más de diez casos
  };
  africaMapScale = {
    '0-50': '#FED5D2',
    '51-1000': '#E36059',
    '>1000': '#BB2124',
  };
  mapRegionValues: any;
  africaMapRegionValues: any;
  loading = true;
  worldDataLoading = true;
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
      // console.log(data);
    });

    if (!this.dataService.worldDataReady) {
      this.dataService.requestWorldData().subscribe(data => {
        // console.log(this.dataService.africaData);
        this.dataService.setWorldData(data);
        this.loadWorldData();
      });
      // this.dataService.setWorldData(null);
      console.log(this.dataService.africaData);
      // this.loadWorldData();
    } else {
      this.loadWorldData();
    }

  }

  private loadWorldData() {
    this.africaMapRegionValues = this.dataService.getAfricaRegionColors();
    this.worldDataLoading = false;
  }

  private loadData () {

    this.lineChartLabels = this.dataService.getMainLineChartLabels();
    this.dataService.bindDataLabels(this.lineChartLabels, this.lineChartData, this.dataService.confirmed);

    this.barChartAccumulatedDataSet[0].data = this.dataService.getAccumulatedDataSet(this.dataService.confirmedData.reportDates,
      this.dataService.confirmed);

    this.bundleBarchartDataSet[1].data = this.dataService.getAccumulatedDataSet(this.dataService.deathsRecoveredDates,
      this.dataService.recovered);
    this.bundleBarchartDataSet[2].data = this.dataService.getAccumulatedDataSet(this.dataService.deathsRecoveredDates,
      this.dataService.deaths);


    // console.log(this.dataService.deathsRecoveredDates);
    let activesData = this.dataService.getActivesAccumulatedDataSet();
    this.dataService.deathsRecoveredDates.forEach(date => {
      this.bundleBarchartDataSet[0].data.push(activesData[this.dataService.reportDates.findIndex(d => d === date)]);
    });
    this.bundleBarchartDataSet[0].data.push(activesData[activesData.length - 1]);


    this.dataService.setDistrictData(this.districtData, null);

    this.mapRegionValues = this.dataService.getRegionColors(this.dataService.confirmedData.regions);

    // console.log(this.dataService.ages, this.dataService.localCases, this.dataService.importedCases);

    this.loading = false;



  }


}
