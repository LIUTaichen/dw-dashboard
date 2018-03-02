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
 

  getApps(): void {
    this.appService.getApps()
      .subscribe(apps => this.apps = apps);
  }

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.getApps();
  }

  add(name: string): void{
    name = name.trim();
    if ( !name) {
        return;
    }
    this.appService.addApp({ name} as AppInfo)
    .subscribe(app =>{
      this.apps.push(app);
    })
  }

}
