import { Injectable } from '@angular/core';
import { AppInfo } from './app-info';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AppService {

  private appsUrl = 'api/apps';
 

  getApps(): Observable<AppInfo[]> {
    this.messageService.add('AppService: fetched apps');
    return this.http.get<AppInfo[]>(this.appsUrl)
    .pipe(
      tap(apps => this.log(`fetched apps`)),
      catchError(this.handleError('getApps', []))
    );
  }

  getApp(id: number): Observable<AppInfo> {
    const url = `${this.appsUrl}/${id}`;
    this.messageService.add('AppService: fetched app');
    return this.http.get<AppInfo>(url)
    .pipe(
      tap(_ => this.log(`fetched app id = ${id}`)),
      catchError(this.handleError<AppInfo>(`geApp id=${id}`))
    );
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  private log(message: string){
      this.messageService.add('AppService: ' + message);
    }

    /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    }
  }

  updateApp(app: AppInfo): Observable<any>{
    
    return this.http.put(this.appsUrl, app, httpOptions).pipe(
      tap(_ => this.log(`updated hero id`)),
      catchError(this.handleError<any>('updateApp'))
    )
  }

  addApp(app: AppInfo): Observable<AppInfo> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<AppInfo>(this.appsUrl, app, httpOptions).pipe(
      tap((app: AppInfo) => this.log(`added app w/ id=${app.id}`)),
      catchError(this.handleError<AppInfo>(`addApp`))
    );
  }

  deleteApp(app: AppInfo | number): Observable<AppInfo> {
    console.log('in service ');
    console.log(app);
    const id = typeof app === 'number' ? app : app.id;
    const url = `${this.appsUrl}/${id}`;
    console.log(url);
    return this.http.delete<AppInfo>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted app w/ id=${id}`)),
      catchError(this.handleError<AppInfo>(`deleteApp`))
    );
  }

  searchApps(term: string): Observable<AppInfo[]>{
      if(!term.trim()){
        return of([]);
      }

      return this.http.get<AppInfo[]>(`api/apps/?name=${term}`).pipe(
        tap(_ => this.log(`found apps matching "${term}"`)),
        catchError(this.handleError<AppInfo[]>(`searchApps`, []))
      );
  }

}
