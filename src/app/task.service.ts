import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {Task} from './task';
import { Observable, of} from 'rxjs';
import { catchError, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private taskUrl = 'api/tasks'; //url to web api

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'applicatin/json'})
  };

  constructor(
    private http: HttpClient
  ) {}

  // Get tasks from the server
  getTasks(): Observable<Task[]>{
    return this.http.get<Task[]>(this.taskUrl)
    .pipe(tap(
      _ => console.log('fetched tasks')),
      catchError(this.handleError<Task[]>('getTasks', [])));
  }

  // Get task by ID. return 'undefined' when id not found
  getTaskNo404<Data>(id: number): Observable<Task> {
    const url = `${this.taskUrl}/?id=${id}`;
    return this.http.get<Task[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          console.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Task>(`getHero id=${id}`))
      );
  }

  // get task by id. will 404 if id not found
  getTask(id: number): Observable<Task> {
    const url = `${this.taskUrl}/${id}`;
    return this.http.get<Task>(url).pipe(
      tap(_ => console.log(`fetched task id = ${id}`)),
      catchError(this.handleError<Task>(`getTask id=${id}`))
    );
  }

  // save / add new task
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.taskUrl, task, this.httpOptions)
    .pipe(
      tap((newTask: Task) => console.log(`added task w/ id=${newTask.id}`)),
      catchError(this.handleError<Task>('addTask'))
    );
  }

  //delete task
  deleteTask(task: Task | number): Observable<Task> {
    const id = typeof task === 'number' ? task : task.id;
    const url = `${this.taskUrl}/${id}`;

    return this.http.delete<Task>(url, this.httpOptions)
    .pipe(
      tap(_ => console.log(`deleted task id = ${id}`)),
      catchError(this.handleError<Task>('deleteTask'))
    );
  }


  // update / put task
  updateTask(task:Task):Observable<Task> {
    return this.http.put(this.taskUrl, task, this.httpOptions)
    .pipe(
      tap(_ => console.log(`update task id = ${task.id}`)),
      catchError(this.handleError<any>('updateTask'))
    );
  }



  private handleError<T> (operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    }
  }
}

