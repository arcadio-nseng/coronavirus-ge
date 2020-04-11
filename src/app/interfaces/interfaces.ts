export interface ReportCase {
  date: string;
  cases: number;
  women: number;
  men: number;
  natives: number;
  foreign: number;
  title: string;
  link: string;
  regions: Regions;
}

export interface Regions {
  Ml: number, Bn: number, Rb: number, Lb: number, An: number, Bt: number, Mb: number, Cg: number, Nf: number,
  Ev: number, Am: number, Mc: number, Eb: number, Nn: number, As: number, Mg: number, Ac: number, Ns: number
}

export interface Data {
  lastUpdate: string;
  recovered: ReportCase[];
  reports: ReportCase[];
  deaths: ReportCase[];
  test: number;
}

export interface ItemData extends ReportCase{
  reportDates: string[];
}

export interface TableData {
  date: string;
  cases: number;
  accumulated: number,
  icon: string;
  increment: number;
  title: string;
  link: string,
  class: string,
}

export interface DistrictData {
  name: string;
  value?: number;
  confirmed?: number;
  recovered?: number;
  deaths?: number;
  actives?: number;
}


