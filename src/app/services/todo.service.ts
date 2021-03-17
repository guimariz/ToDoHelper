import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  add(task: any) {
    let url = 'http://127.0.0.1:8080/tasks/';

    let header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    }

    return this.http.post(url, task, header).toPromise();
  }

  addMensais(id, allDone, allTotal) {
    let url = 'http://127.0.0.1:8080/tasksmensais/';

    let header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    }

    let param = { id, allDone, allTotal };

    return this.http.post(url, param, header).toPromise();
  }

  update(task: any) {
    let url = 'http://127.0.0.1:8080/tasks/' + task.id;
    
    let header = {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    }
    
    return this.http.put(url, task, header).toPromise();
  }

  updateMensais(id, allDone: boolean, allTotal: boolean) {
    let url = 'http://127.0.0.1:8080/tasksmensais/' + id;

    let header = {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    }

    let param = { allDone, allTotal };

    return this.http.put(url, param, header).toPromise();
  }

  getDoneTasks() {
    let url = 'http://127.0.0.1:8080/tasks/done';

    return this.http.get(url).toPromise();
  }

  getAllDone() {
    let url = 'http://127.0.0.1:8080/tasksmensais/done';

    return this.http.get(url).toPromise();
  }

  delete(id : any) {
    let url = 'http://127.0.0.1:8080/tasks/' + id;

    return this.http.delete(url).toPromise();
  }

  list() {
    let url = 'http://127.0.0.1:8080/tasks';

    return this.http.get(url).toPromise();
  }

  resetTasks() {
    let url = 'http://127.0.0.1:8080/tasks/all';

    let header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    }

    return this.http.put(url, header).toPromise();
  }

  getTotalTasks() {
    let url = 'http://127.0.0.1:8080/tasksmensais';

    return this.http.get(url).toPromise();
  }


  deleteAllTasks() {
    let url = 'http://127.0.0.1:8080/tasks/all';

    return this.http.delete(url).toPromise();
  }

}
