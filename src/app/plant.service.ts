import { Injectable } from '@angular/core';
import { Plant } from './plant';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import * as wellknown from 'wellknown';
@Injectable()
export class PlantService {

  private plantsUrl = 'https://dempseywoodgps.tk/api/new';

  constructor(private http: HttpClient,) { }

  getPlants(): Observable<Plant[]> {
    return this.http.get<any>(this.plantsUrl,)
      .pipe(
      tap(plants => console.log(plants)),
      catchError(error => of(`Bad Promise: ${error}`))
    ).map(plantJson => {
      let plants = new Array<Plant>();
      plantJson.forEach(element => {

        let plant : Plant = new Plant();
        plant.id = element.VehicleId;
        plant.fleetNo = element.VehicleName;
        plant.latlng = [element.LastLat, element.LastLon];
        plants.push(plant);
      });
      return plants;
    }

    );

  }

}
