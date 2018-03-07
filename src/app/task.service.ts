import { Injectable } from '@angular/core';
import { Task } from './task';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class TaskService {

  private tasksUrl = 'http://localhost:8090/api/task';

  constructor(private http: HttpClient,) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl);
  }

}
