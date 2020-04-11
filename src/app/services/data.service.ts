import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ReportCase, Data, ItemData, TableData, DistrictData} from "../interfaces/interfaces";
import {Regions} from "../interfaces/interfaces";
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  confirmed: ReportCase[] = [];
  confirmedData: ItemData;
  deaths: ReportCase[] = [];
  deathsData: ItemData;
  recovered: ReportCase[] = [];
  recoveredData: ItemData;
  activesData: ItemData;
  lastUpdate: string;
  reportDates: string[] = [];
  deathsRecoveredDates: string[];
  lastFewDays: string[] = [];
  totalConfirmed: number;
  totalRecovered: number;
  totalActives: number;
  totalDeaths: number;
  totalTests: number;
  dataReady = false;

  constructor(private httpClient: HttpClient) {
    moment.locale('es', {monthsShort:
        'Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic'.split('_')});

    let now = moment();

    this.lastFewDays.push(now.format('D MMM, YYYY'));
    for (let i = 0; i < 6; i++) {
      this.lastFewDays.push(now.subtract(1, 'day').format('D MMM, YYYY'));
    }
    this.lastFewDays.reverse();
  }

  getMainLineChartLabels () {

    let labels: string[] = [];
    let now = moment();
    labels.push(now.format('D MMM, YYYY'));
    while (true) {
      let day = now.subtract(1, 'day').format('D MMM, YYYY');
      labels.push(day);
      if (day === '14 Mar, 2020') break;
    }

    labels.reverse();

    return labels;

  }


  requestData () {

    return this.httpClient.get<Data>('https://coronavirus-ge.firebaseio.com/data.json');

  }

  setData (data: Data) {

    this.confirmed = data.reports;
    this.recovered = data.recovered;
    this.deaths = (typeof data.deaths === 'number') ? [] : data.deaths;
    this.lastUpdate = data.lastUpdate;
    this.totalTests = data.test;

    this.setItemData('confirmed');
    this.setItemData('recovered');
    this.setItemData('deaths');

    this.setReportDates();
    this.setActiveData();

    this.sortData(this.confirmed);
    this.sortData(this.recovered);
    this.sortData(this.deaths);

    this.totalConfirmed = this.confirmedData.cases;
    this.totalRecovered = this.recoveredData.cases;
    this.totalActives = this.activesData.cases;
    this.totalDeaths = this.deathsData.cases;

    this.dataReady = true;

  }

  getTableData(data: ReportCase[], invColor = false): TableData[] {

    let tableData: TableData[] = [];
    let previous = 0;
    let total = 0;
    let previousTotal = 0;
    let previousIncrement = 0;

    data.forEach(report => {
      total += report.cases;
      let increment = previous === 0 ? 1 : (total - previousTotal) / previousTotal;
      let a = Math.round(previousIncrement * 100);
      let b = Math.round(increment * 100);
      tableData.push({
        date: report.date,
        cases: report.cases,
        accumulated: total,
        title: report.title,
        increment: increment,
        icon: a === b ? 'equals' : b > a ? 'caret-up' : 'caret-down',
        class: a === b ? 'text-warning' : b > a ? (invColor ? 'text-success' : 'text-danger') : (invColor ? 'text-danger' : 'text-success'),
        link: report.link,
      });
      previous = report.cases;
      previousTotal = total;
      previousIncrement = increment;
    });

    return tableData;
  }

  bindDataLabels(labels: string[], data: any[], dataSource: ReportCase[], accumulated = false) {

    let count = 0;
    labels.forEach((date) => {

      let dayCase = dataSource.find(c => c.date === date);
      if (!accumulated) data[0].data.push(dayCase !== undefined ? dayCase.cases : 0);
      else {
        count += dayCase !== undefined ? dayCase.cases : 0;
        data[0].data.push(count)
      }

    });

  }

  getRegionColors(regions: Regions, colorConfig: string[] = ['0', '1-10', '>10']) {

    let regionColors = {};

    for (const region in regions) {

      if (regions[region] === 0) regionColors[region] = colorConfig[0];
      else if (regions[region] <= 10) regionColors[region] = colorConfig[1];
      else if (regions[region] > 10) regionColors[region] = colorConfig[2];

    }

    return regionColors;

  }

  getDistrictName (abr: string) {

    switch (abr) {
      case 'Ml': return 'Malabo';
      case 'Bn': return 'Baney';
      case 'Rb': return 'Riaba';
      case 'Lb': return 'Lubá';
      case 'An': return 'Annobón';
      case 'Bt': return 'Bata';
      case 'Mb': return 'Mbini';
      case 'Cg': return 'Cogo';
      case 'Nf': return 'Niefang';
      case 'Ev': return 'Evinayong';
      case 'Am': return 'Acurenam';
      case 'Mc': return 'Micomeseng';
      case 'Eb': return 'Ebibeyín';
      case 'Nn': return 'Nsock Nsomo';
      case 'As': return 'Añisock';
      case 'Mg': return 'Mongomo';
      case 'Ac': return 'Aconibe';
      case 'Ns': return 'Nsork';
      default: return 'Distrito desconocido';
    }

  }

  getAccumulatedDataSet (labels: string[], data: ReportCase[]): number[] {

    let accumulated: number[] = [];
    let count = 0;
    labels.forEach( date => {
      let report = data.find(c => c.date === date);
      count += report === undefined ? 0 : report.cases;
      accumulated.push(count);
    });
    return accumulated;

  }

  getActivesAccumulatedDataSet (): number[] {

    let accumulated: number[] = [];
    let count = 0;
    this.reportDates.forEach( date => {
      let confirmed = this.confirmed.find(c => c.date === date);
      let recovered = this.recovered.find(c => c.date === date);
      let deaths = this.deaths.find(c => c.date === date);
      let confirmedCases = confirmed === undefined ? 0 : confirmed.cases;
      let recoveredCases = recovered === undefined ? 0 : recovered.cases;
      let deathsCases = deaths === undefined ? 0 : deaths.cases;
      count += (confirmedCases - recoveredCases - deathsCases);
      accumulated.push(count);
    });
    return accumulated;
  }


  private getItemRegions (data: ReportCase[]){

    let regionValues: Regions = {
      Ml: 0, Bn: 0, Rb: 0, Lb: 0, An: 0, Bt: 0, Mb: 0, Cg: 0, Nf: 0, Ev: 0, Am: 0, Mc: 0,
      Eb: 0, Nn: 0, As: 0, Mg: 0, Ac: 0, Ns: 0
    };

    data.forEach(report => {
      for (const region in report.regions) regionValues[region] += report.regions[region];
    });

    return regionValues;

  }

  private getItemReportDates (data: ReportCase[]) {

    let dates: string[] = [];

    data.forEach(item => dates.push(item.date));
    this.sortDateLabels(dates);

    return dates;

  }

  setDistrictData (data: DistrictData[], regionValues: Regions) {

    if (regionValues !== null) {

      for (const region in regionValues){
        if (regionValues[region] > 0)
          data.push({name: region, value: regionValues[region] });
      }

    } else {

      for (const region in this.confirmedData.regions) {

        if (this.confirmedData.regions[region] > 0 || this.recoveredData.regions[region] > 0 ||
            this.activesData.regions[region] > 0 || this.deathsData.regions[region] > 0) {

          data.push({
            name: region,
            confirmed: this.confirmedData.regions[region],
            recovered: this.recoveredData.regions[region],
            actives: this.activesData.regions[region],
            deaths: this.deathsData.regions[region]
          });

        }

      }

    }

  }

  private setItemData (type: 'confirmed' | 'recovered' | 'deaths') {

    let data: ReportCase[] = (type === 'confirmed') ? this.confirmed : (type === 'recovered') ? this.recovered :
      this.deaths;


    let dataItem: ItemData = {cases: 0, men: 0, women: 0, natives: 0, foreign: 0, regions: null, reportDates: null,
      date: null, link: null, title: null};

    dataItem.cases = this.countItems(data, 'cases');
    dataItem.men = this.countItems(data, 'men');
    dataItem.women = this.countItems(data, 'women');
    dataItem.natives = this.countItems(data, 'natives');
    dataItem.foreign = this.countItems(data, 'foreign');
    dataItem.regions = this.getItemRegions(data);
    dataItem.reportDates = this.getItemReportDates(data);

    if (type === 'confirmed') this.confirmedData = dataItem;
    else if (type === 'recovered') this.recoveredData = dataItem;
    else if (type === 'deaths') this.deathsData = dataItem;

  }

  private countItems (
    data: ReportCase[],
    field: 'cases' | 'men' | 'women' | 'natives' | 'foreign'): number {

    let total = 0;

    data.forEach(item => total += item[field]);

    return total;

  }

  /**
   * @description obtiene los casos activos de cada región
   */
  private getActivesRegions () {

    let regionValues: Regions = {
      Ml: 0, Bn: 0, Rb: 0, Lb: 0, An: 0, Bt: 0, Mb: 0, Cg: 0, Nf: 0, Ev: 0, Am: 0, Mc: 0,
      Eb: 0, Nn: 0, As: 0, Mg: 0, Ac: 0, Ns: 0
    };

    for (const region in this.confirmedData.regions) regionValues[region] += this.confirmedData.regions[region];
    for (const region in this.recoveredData.regions) regionValues[region] -= this.recoveredData.regions[region];
    for (const region in this.deathsData.regions) regionValues[region] -= this.deathsData.regions[region];

    return regionValues;

  }

  private setReportDates () {

    let dates: string[] = [];
    let deathsRecoveredDates: string[] = [];

    this.confirmed.forEach(report => dates.push(report.date));
    this.recovered.forEach(report => {
      dates.push(report.date);
      deathsRecoveredDates.push(report.date);
    });
    this.deaths.forEach(report => {
      dates.push(report.date);
      deathsRecoveredDates.push(report.date);
    });

    this.reportDates = [...new Set(dates)];
    this.sortDateLabels(this.reportDates);

    deathsRecoveredDates.push(this.reportDates[this.reportDates.length - 1]);
    this.deathsRecoveredDates = [...new Set(deathsRecoveredDates)];
    this.sortDateLabels(this.deathsRecoveredDates);


  }

  sortDateLabels(labels: string[]) {
    labels.sort((a, b) => {
      let time1 = moment(a, 'D MMM, YYYY');
      let time2 = moment(b, 'D MMM, YYYY');
      if (time1.isBefore(time2)) return -1;
      if (time1.isAfter(time2)) return 1;
      return 0;
    });
  }

  private sortData(data: ReportCase[]) {
    data.sort((a, b) => {
      let time1 = moment(a.date, 'D MMM, YYYY');
      let time2 = moment(b.date, 'D MMM, YYYY');
      if (time1.isBefore(time2)) return -1;
      if (time1.isAfter(time2)) return 1;
      return 0;
    });
  }

  private setActiveData () {

    let data: ItemData = {cases: 0, men: 0, women: 0, natives: 0, foreign: 0, regions: null, reportDates: null,
      date: null, link: null, title: null};

    data.men = this.confirmedData.men - this.recoveredData.men - this.deathsData.men;
    data.cases = this.confirmedData.cases - this.recoveredData.cases - this.deathsData.cases;
    data.women = this.confirmedData.women - this.recoveredData.women - this.deathsData.women;
    data.foreign = this.confirmedData.foreign - this.recoveredData.foreign - this.deathsData.foreign;
    data.natives = this.confirmedData.natives - this.recoveredData.natives - this.deathsData.natives;
    data.regions = this.getActivesRegions();
    data.reportDates = this.reportDates;

    this.activesData = data

  }

}





