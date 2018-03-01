import { Component, OnInit } from '@angular/core';
import { AppInfo } from '../app-info';
import { AppService } from '../app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  apps: AppInfo[] = [];

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.getApps();
  }

  getApps(): void {
    this.appService.getApps()
      .subscribe(apps => this.apps = apps.slice(1, 5));
  }

}
