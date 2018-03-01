import { Component, OnInit } from '@angular/core';
import { AppInfo } from '../app-info';
import { AppService } from '../app.service';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.css']
})
export class AppsComponent implements OnInit {
  apps: AppInfo[];
  note = '';
  app: AppInfo = {
    id: 1,
    name: 'Fleetagent',
    url: 'https://portal.fleetagent.co.nz',
    desciption: 'Gps tracking portal',
    imageUrl: 'https://www.google.com/webpagethumbnail?c=63&d=https://portal.fleetagent.co.nz/&r=4&s=154:96&a=iOInTjgwSYbDwNxj-eflOdQN1A8'
  };

  getApps(): void {
    this.appService.getApps()
      .subscribe(apps => this.apps = apps);
  }

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.getApps();
  }

}
