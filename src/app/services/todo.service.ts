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

  update(task: any) {
    let url = 'http://127.0.0.1:8080/tasks/' + task.id;
    
    let header = {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    }
    
    return this.http.put(url, task, header).toPromise();
  }
  
  // updateStatus(task: any) {
  //   let url = 'http://127.0.0.1:8080/tasks/' + task.id;
    
  //   let header = {
  //     headers: new HttpHeaders()
  //     .set('Content-Type', 'application/json')
  //   }

  //   return this.http.put(url, task.status, header).toPromise();
    
  // }

  getDoneTasks() {
    let url = 'http://127.0.0.1:8080/tasks/done';

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

}
