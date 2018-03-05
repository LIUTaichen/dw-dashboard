import { Injectable } from '@angular/core';
import { Geofence } from './geofence';
import { GEOFENCES} from './mock-geofences';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import * as wellknown from 'wellknown';
@Injectable()
export class GeofenceService {

  private geofencesUrl = 'https://webapi.blackhawktracking.com/api/GeoFence?includeGeometries=true';

  constructor(private http: HttpClient,) { }

  getGeofences(): Observable<Geofence[]> {
    const httpOptions = {
      headers: new HttpHeaders({ 'token': '034A9768-D9F0-4D4D-9BB1-02E3932A44E3' })
    };
    return this.http.get<any>(this.geofencesUrl, httpOptions)
      .pipe(
      tap(geofences => console.log(geofences)),
      catchError(error => of(`Bad Promise: ${error}`))
    ).map(geofences => {
      console.log(geofences);
      let fences = new Array<Geofence>();
      geofences.forEach(json =>{
          let geofence: Geofence = new  Geofence();
          geofence.id = json.Id;
          geofence.name = json.Name;
          geofence.description = json.Description;
          let polygon: any = wellknown.parse(json.WellKnownText);
          if(!polygon){
            console.log("geofence " + json.Description + " is not a converted to a polygon, skipping it");
            return;
          }
          let latLngs = [];
             console.log(polygon.coordinates);
             if(polygon.type === 'Polygon'){
                polygon.coordinates.forEach(pointsArray => {
                  let simplePoly = [];
                  latLngs.push(simplePoly);
                  pointsArray.forEach(points =>{
                    simplePoly.push([points[1], points[0]]);
                  });
                });
              }else{
                polygon.coordinates.forEach(level1 => {
                  let simplePoly = [];
                  latLngs.push(simplePoly);
                  level1[0].forEach(points =>{
                    simplePoly.push([points[1], points[0]]);
                  });
                });
              }

          geofence.latlngs = latLngs;
          fences.push(geofence);
      });
      return fences;
    } );
   
  }
 
  testApi(): void{
    const httpOptions = {
      headers: new HttpHeaders({ 'token': '034A9768-D9F0-4D4D-9BB1-02E3932A44E3' })
    };
    console.log('testing api');
    this.http.get<any>(this.geofencesUrl, httpOptions)
      .pipe(
      tap(geofences => console.log(geofences)),
      catchError(error => of(`Bad Promise: ${error}`))
    ).subscribe(geofences => console.log(geofences));
  }

}
