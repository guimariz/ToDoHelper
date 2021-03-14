import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  add(task: any) {
    let url = 'http://127.0.0.1:8080/tasks';

    let header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    }

    let param = { taskName: task.taskName, status: task.status, open: task.open, taskStart: task.taskStart, taskTimer: task.taskTimer, restTimer: task.restTimer }

    return this.http.post(url, task, header).toPromise();
  }

}
