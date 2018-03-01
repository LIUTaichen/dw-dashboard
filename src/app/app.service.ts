import { Injectable } from '@angular/core';
import { AppInfo } from './app-info';
import { APPS } from './mock-apps';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';

@Injectable()
export class AppService {

  getApps(): Observable<AppInfo[]> {
    this.messageService.add('AppService: fetched apps');
    return of(APPS);
  }

  getApp(id: number): Observable<AppInfo> {
    this.messageService.add('AppService: fetched app');
    return of(APPS.find(app => app.id === id));
  }

  constructor(private messageService: MessageService) { }

}
