import { Injectable } from '@angular/core';
import { App } from './app';
import { APPS } from './mock-apps';

@Injectable()
export class AppService {

  getApps(): App[] {
    return APPS;
  }

  constructor() { }

}
