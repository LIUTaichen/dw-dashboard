import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class TrackingService {

  

  constructor(private http: HttpClient,) { }

  getGoogleSheetPlantList(): Observable<any> {
    const sheetsDataUrl = 'http://localhost:3001/';
    return this.http.get<any>(sheetsDataUrl,)
      .pipe(
      tap(plants => console.log(plants.length)),
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
