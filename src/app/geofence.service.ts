import { Injectable } from '@angular/core';
import { Geofence } from './geofence';
import { GEOFENCES} from './mock-geofences';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
@Injectable()
export class GeofenceService {

  constructor() { }

  getGeofences(): Observable<Geofence[]> {
    return of(GEOFENCES);
  }

}
