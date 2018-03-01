import { Injectable } from '@angular/core';
import { AppInfo } from './app-info';
import { APPS } from './mock-apps';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class AppService {

  getApps(): Observable<AppInfo[]> {
    return of(APPS);
  }

  constructor() { }

}
