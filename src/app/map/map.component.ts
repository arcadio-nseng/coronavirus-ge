import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // @ts-ignore
    $('#map').vectorMap({
      map: 'eg_province',
      markersSelectable: true,
      zoomMax: 1,
      zoomMin: 1,
      regionStyle: {
        initial: {
          fill: '#02B2FF',
          stroke: 'white',
          "stroke-width": 1.5
        },
        hover: {
          fill: '#02DBFF'
        }
      },
      series: {
        regions: [{
          values: {
            'BN': '#ffa1b5',
            'LT': '#ffa1b5',
          },
          attribute: 'fill'
        }]
      }
    });
  }

}
