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
  ages: number[];
  types: {local: number, imported: number};
}

export interface Regions {
  Ml: number, Bn: number, Rb: number, Lb: number, An: number, Bt: number, Mb: number, Cg: number, Nf: number,
  Ev: number, Am: number, Mc: number, Eb: number, Nn: number, As: number, Mg: number, Ac: number, Ns: number
}

export interface CountryData {
  countryCode: string,
  recovered: number,
  confirmed: number,
  deaths: number
}

export interface AfricaData {
  summary: {recovered: number, confirmed: number, deaths: number, actives: number},
  countries: CountryData[]
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


/*https://api.covid19api.com results*/
export interface Global {
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
}

export interface Country {
  Country: string;
  CountryCode: string;
  Slug: string;
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
  Date: Date;
}

export interface ApiResult {
  Global: Global;
  Countries: Country[];
  Date: Date;
}


