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
    ).map(plantsString => {
      let plants = new Array<Plant>();
        let plantJson = JSON.parse(plantsString);
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

  getGoogleSheetPlantList(): Observable<any[]> {
    const sheetsDataUrl = 'http://localhost:3001/plants'
    return this.http.get<any>(sheetsDataUrl,)
      .pipe(
      tap(plants => console.log(plants.length)),
      catchError(error => of(`Bad Promise: ${error}`))
    ).map(rawRows =>{
      return this.convertRowToObject(rawRows);
    });
  }

  getProjectList(): Observable<any[]> {
    const sheetsDataUrl = 'http://localhost:3001/projects'
    return this.http.get<any>(sheetsDataUrl,)
      .pipe(
      tap(projects => console.log(projects.length)),
      catchError(error => of(`Bad Promise: ${error}`))
    ).map(rawRows =>{
      return this.convertRowToObject(rawRows);
    });
  }

  convertRowToObject(data): any[]{
    var headers = data[0];
    console.log(headers);
    var result = [];
    for(let i = 1; i < data.length; i++){
            var item = {};
            for(let j = 0; j < headers.length; j ++){
                item[headers[j]] = data[i][j]; 
            }
            result.push(item);
    }
    return result;
}

}
