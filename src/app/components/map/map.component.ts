import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Input() config: any;
  @Input() regionColors: any[] = [];
  @Input() legendTitle: string = 'Casos';
  @Input() scale = {
    '0': '#02DBFF', //cero casos
    '1-10': '#FFA225', //uno a diez casos
    '>10': '#FF8C44', //más de diez casos
  }
  constructor() { }

  ngOnInit() {
    // @ts-ignore
    $('#map').vectorMap({
      map: 'eg_district',
      markersSelectable: true,
      backgroundColor: '#ffffff',
      zoomButtons : false,
      zoomMax: 1,
      zoomMin: 1,
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
      }
    });
  }

}
