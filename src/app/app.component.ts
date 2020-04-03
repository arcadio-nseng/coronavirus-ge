import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DataService, ReportCase, RecoveredCase} from "./data.service";
import {PieChartComponent} from "./pie-chart/pie-chart.component";
import * as moment from "moment";
import {ChartDataSets} from "chart.js";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'Coronavirus en Guinea Ecuatorial';
  loading = true;
  contentLoading = true;
  reports: ReportCase[] = [];
  recovered: RecoveredCase[];
  deaths: RecoveredCase[] = [];
  lastUpdate: string = '20 Mar, 2020';
  lastUpdateIso: string = '2020-03-20';
  totalRecovered: number;
  totalReports: number = 0;
  activeCases: number = 0;
  totalDeaths: number = 0;
  nativeCases: number = 0;
  foreignCases: number = 0;
  menCases: number = 0;
  womenCases: number = 0;
  barChartLabels: string[] = [];
  lineChartLabels: string[] = [];
  barChartDataSet: any[] = [
    {data: [], label: 'Nuevos casos'},
    {data: [], label: 'Recuperados'},
    {data: [], label: 'Fallecidos'},
    ];
  lineChartData: any[] = [
    { data: [], label: 'Confirmados', fill: true },
    { data: [], label: 'Recuperados', fill: true },
    { data: [], label: 'Fallecidos', fill: true }
  ];

  @ViewChild('chart', {static: false}) chart: PieChartComponent;

  constructor(private dataService: DataService) {

    moment.locale('es', {monthsShort: 'Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic'.split('_')});

    let now = moment();

    this.barChartLabels.push(now.format('D MMM, YYYY'));
    for (let i = 0; i < 6; i++){
      this.barChartLabels.push(now.subtract(1, 'day').format('D MMM, YYYY'));
    }
    this.barChartLabels.reverse();

    /*let time1 = moment('2 Abr, 2020', 'D MMM, YYYY');
    let time2 = moment('17 Mar, 2020', 'D MMM, YYYY');
    console.log(time1.isAfter(time2));*/

  }

  ngOnInit(): void {

    this.dataService.getReports().subscribe(response => {
      this.reports = response as ReportCase[];
      this.reports.splice(0, 1);
      this.reports.sort((a, b) => {
        let time1 = moment(a.date, 'D MMM, YYYY');
        let time2 = moment(b.date, 'D MMM, YYYY');
        if (time1.isBefore(time2)) return -1;
        if (time1.isAfter(time2)) return 1;
        return 0;
      });

      this.reports.forEach((report) => {
        this.totalReports += report.cases;
      });

      this.dataService.getRecovered().subscribe(response => {
        this.recovered = response as RecoveredCase[];
        this.recovered.splice(0, 1);
        this.totalRecovered = this.recovered.length;
        this.activeCases = this.totalReports - this.totalRecovered;

        this.dataService.getDeaths().subscribe(response => {
          if (typeof response !== "number") this.deaths = response as RecoveredCase[];
          this.setData();
        });

      });


    });

    this.dataService.getLastUpdate().subscribe(response => {
      this.lastUpdate = response as string;
    });

  }

  private setData () {

    let labels: string[] = [];

    this.reports.forEach((report) => {

      this.nativeCases += report.natives;
      this.foreignCases += report.foreigns;
      this.womenCases += report.women;
      this.menCases += report.men;
      labels.push(report.date);

    });

    this.recovered.forEach((recover) => {
      labels.push(recover.date);
    });

    this.deaths.forEach((death) => {
      labels.push(death.date);
    });

    this.lineChartLabels = [...new Set(labels)];

    this.lineChartLabels.sort((a, b) => {
      let time1 = moment(a, 'D MMM, YYYY');
      let time2 = moment(b, 'D MMM, YYYY');
      if (time1.isBefore(time2)) return -1;
      if (time1.isAfter(time2)) return 1;
      return 0;
    });

    this.barChartLabels.forEach((date) => {

      let dayCase = this.reports.find(c => c.date === date);
      let recovered = this.recovered.find(r => r.date === date);
      let death = this.deaths.find(d => d.date === date);
      this.barChartDataSet[0].data.push(dayCase !== undefined ? dayCase.cases : 0);
      this.barChartDataSet[1].data.push(recovered !== undefined ? recovered.cases : 0);
      this.barChartDataSet[2].data.push(death !== undefined ? death.cases : 0);
    });

    this.lineChartLabels.forEach((date) => {
      let dayCase = this.reports.find(c => c.date === date);
      let recovered = this.recovered.find(r => r.date === date);
      let death = this.deaths.find(d => d.date === date);
      this.lineChartData[0].data.push(dayCase !== undefined ? dayCase.cases : 0);
      this.lineChartData[1].data.push(recovered !== undefined ? recovered.cases : 0);
      this.lineChartData[2].data.push(death !== undefined ? death.cases : 0);
    });

    this.totalDeaths = this.deaths.length;

    this.loading = false;

  }

  ngAfterViewInit(): void {
    this.contentLoading = false
  }



}


