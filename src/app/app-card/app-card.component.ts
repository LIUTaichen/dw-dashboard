import { Component, OnInit, Input } from '@angular/core';
import { AppInfo } from '../app-info';

@Component({
  selector: 'app-app-card',
  templateUrl: './app-card.component.html',
  styleUrls: ['./app-card.component.css']
})
export class AppCardComponent implements OnInit {

  @Input() app: AppInfo;
  constructor() { }

  ngOnInit() {
  }

}
