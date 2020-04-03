import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private cases: ReportCase[];
  private recovered: RecoveredCase[];
  constructor(private httpClient: HttpClient) { }

  getReports() {

    return this.httpClient.get('https://coronavirus-ge.firebaseio.com/data/reports.json');

  }

  getRecovered() {

    return this.httpClient.get('https://coronavirus-ge.firebaseio.com/data/recovereds.json');

  }

  getDeaths() {

    return this.httpClient.get('https://coronavirus-ge.firebaseio.com/data/deaths.json');

  }

  getLastUpdate() {
    return this.httpClient.get('https://coronavirus-ge.firebaseio.com/data/lastUpdate.json');
  }

}

export interface ReportCase {
  date: string;
  dates?: string;
  cases: number;
  women: number;
  men: number;
  natives: number;
  foreigns: number;
  title: string;
  link: string;
  regions: string[];
}

export interface RecoveredCase {
  date: string;
  cases: number;
  women: number;
  men: number;
  natives: number;
  foreigns: number;
}
