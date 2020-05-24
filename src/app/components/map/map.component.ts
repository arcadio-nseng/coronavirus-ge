import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
// import * as $ from 'jquery';
declare var $: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  @Input() map: 'eg_district' | 'africa_mill' = 'eg_district';
  // @Input() config: any;
  @Input() zoomConfig: {enabled: boolean, min: number, max: number} = {
    enabled: false,
    min: 1,
    max: 1
  }
  @Input() regionColors: any[] = [];
  @Input() legendTitle: string = 'Casos';
  @Input() scale = {
    '0': '#02DBFF', //cero casos
    '1-10': '#FFA225', //uno a diez casos
    '>10': '#FF8C44', //más de diez casos
  }
  constructor() { }

  ngAfterViewInit() {

    $(`#${this.map}`).vectorMap({
      map: this.map,
      markersSelectable: true,
      backgroundColor: '#ffffff',
      zoomButtons : this.zoomConfig.enabled,
      zoomMax: this.zoomConfig.max,
      zoomMin: this.zoomConfig.min,
      regionStyle: {
        initial: {
          stroke: 'white',
          "stroke-width": 1.5
        },
        hover: {
          'fill-opacity': 0.5
        }
      },
      series: {
        regions: [{
          scale: this.scale,
          values: this.regionColors,
          attribute: 'fill',
          legend: {
            horizontal: true,
            title: this.legendTitle
          }
        }]
      },
      onRegionTipShow: (e, label, code) => {
        console.log(label.text());
        label.text(`Code: ${code}`)
      }
    });
  }



}
