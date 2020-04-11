import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {DataService} from "../../services/data.service";


@Component({
  selector: 'app-actives',
  templateUrl: './actives.component.html',
  styleUrls: ['./actives.component.css']
})
export class ActivesComponent implements OnInit {


  districtData: { name: string, value: number }[] = [];
  mapScale = {
    '0': '#02DBFF', //cero casos
    '1-10': '#939FA0', //uno a diez casos
    '>10': '#39353F', //más de diez casos
  };
  mapRegionValues: any;
  loading = true;


  barChartAccumulatedDataSet: any[] = [
    {data: [], label: 'Casos activos', backgroundColor: '#6C757D'},
  ];

  constructor(public dataService: DataService, private titleService: Title) {
    titleService.setTitle('Casos activos de COVID-19 en Guinea Ecuatorial');
  }

  ngOnInit(): void {
    this.init();
  }


  private init () {

    if (this.dataService.dataReady) this.loadData();
    else this.dataService.requestData().subscribe(data => {
      this.dataService.setData(data);
      this.loadData();
    });

  }

  private loadData () {

    this.barChartAccumulatedDataSet[0].data = this.dataService.getActivesAccumulatedDataSet();

    this.dataService.setDistrictData(this.districtData, this.dataService.activesData.regions);

    this.mapRegionValues = this.dataService.getRegionColors(this.dataService.activesData.regions)

    this.loading = false;

  }


}
