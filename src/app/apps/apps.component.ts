import { Component, OnInit } from '@angular/core';
import { App } from '../app';
import { AppService } from '../app.service';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.css']
})
export class AppsComponent implements OnInit {
  apps: App[];
  note = '';
  app: App = {
    id: 1,
    name: 'Fleetagent',
    url: 'https://portal.fleetagent.co.nz',
    desciption: 'Gps tracking portal',
    imageUrl: 'https://www.google.com/webpagethumbnail?c=63&d=https://portal.fleetagent.co.nz/&r=4&s=154:96&a=iOInTjgwSYbDwNxj-eflOdQN1A8'
  };
  selectedApp: App;
  onSelect(app: App): void {
    this.selectedApp = app;
  }

  getApps(): void {
    this.apps = this.appService.getApps();
  }

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.getApps();
  }

}
