import { Component, OnInit, Input } from '@angular/core';
import { App } from '../app';

@Component({
  selector: 'app-app-card',
  templateUrl: './app-card.component.html',
  styleUrls: ['./app-card.component.css']
})
export class AppCardComponent implements OnInit {

  @Input() app: App;
  constructor() { }

  ngOnInit() {
  }

}
