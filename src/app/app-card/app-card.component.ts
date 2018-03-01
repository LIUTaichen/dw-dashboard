import { Component, OnInit, Input } from '@angular/core';
import { AppInfo } from '../app-info';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { AppService } from '../app.service';

@Component({
  selector: 'app-app-card',
  templateUrl: './app-card.component.html',
  styleUrls: ['./app-card.component.css']
})
export class AppCardComponent implements OnInit {

  @Input() app: AppInfo;
  constructor(
    private route: ActivatedRoute,
    private appService: AppService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getApp();
  }

  getApp(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.appService.getApp(id)
      .subscribe(app => this.app = app);
  }

  goBack(): void {
    this.location.back();
  }

}
