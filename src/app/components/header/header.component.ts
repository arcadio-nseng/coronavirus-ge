import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() totalReports: number = 0;
  @Input() totalRecovered: number = 0;
  @Input() totalDeaths: number = 0;
  @Input() confirmedButtonClass: string = 'btn-outline-primary';
  @Input() recoveredButtonClass: string = 'btn-outline-primary';
  @Input() activesButtonClass: string = 'btn-outline-primary';
  @Input() deathsButtonClass: string = 'btn-outline-primary';
  @Input() homeButtonClass: string = 'btn-outline-primary';
  constructor() { }

  ngOnInit() {
  }

}
