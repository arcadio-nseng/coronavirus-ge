import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css']
})
export class NoticeComponent implements OnInit {

  @Input() title: string;
  @Input() subtitle: string;
  constructor() { }

  ngOnInit() {
  }

}
