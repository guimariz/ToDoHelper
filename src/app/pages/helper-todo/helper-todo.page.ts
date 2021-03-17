import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-helper-todo',
  templateUrl: './helper-todo.page.html',
  styleUrls: ['./helper-todo.page.scss'],
})
export class HelperTodoPage implements OnInit {

  totalTasks : number = 0;
  doneTasks : number = 0;
  rankingTodo : number = 0;
  allDone : number = 0;
  allTotal : number = 0;

  constructor(private todoService : TodoService) { 
    this.loadHelperTodo();
  }

  ngOnInit() {
  }

  loadHelperTodo() {
    this.todoService.list()
      .then(async (res : any[]) => {
        this.totalTasks = await res.length;
        this.showDoneTasks();
        this.getTotalTasks();
        this.getAllDone();
      })
      .catch(async (err) => {
        console.error(err);
      });
  }
    
  showDoneTasks() {
    this.todoService.getDoneTasks()
    .then(async (res : any) => {
      this.doneTasks = await res.length;
      this.showRankingTodo();
    })
    .catch();
  }

  showRankingTodo() {
    if(this.rankingTodo) {
      this.rankingTodo = (this.doneTasks * 100) / this.totalTasks; 
    }
  }

  getTotalTasks() {
    this.todoService.getTotalTasks()
      .then(async (res : any) => {
        this.allTotal = await res.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getAllDone() {
    this.todoService.getAllDone()
      .then(async (res : any) => {
        this.allDone = await res.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }

}
