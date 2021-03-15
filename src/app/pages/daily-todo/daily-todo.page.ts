import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-daily-todo',
  templateUrl: './daily-todo.page.html',
  styleUrls: ['./daily-todo.page.scss'],
})
export class DailyTodoPage implements OnInit {

  autoToggle : boolean = true;
  isAuto : boolean = true;
  tasks : any[] = [];
  totalTasks : number = 0;
  doneTasks : number = 0;
  isRest : boolean = false;

  constructor(private alertCtrl : AlertController, private toastCtrl : ToastController, private actionSheetCtrl : ActionSheetController, private todoService : TodoService) {
    // let taskJson = localStorage.getItem('taskDb');

    // if (taskJson) {
    //   this.tasks = JSON.parse(taskJson);
    // }
    this.loadTasks();
  }

  loadTasks() {
    this.todoService.list()
    .then(async (res : any[]) => {
      this.tasks = res;
    })
    .catch(async (err) => {
      console.error(err);
      const toast = await this.toastCtrl.create({
        message : 'Algo deu errado ao exibir as tasks!',
        duration : 2000,
        position : 'top',
      });

      toast.present();
    });
  }

  ngOnInit() {
  }

  autoChange(event) {
    event === true ? this.isAuto = false : this.isAuto = true;
  }

  async showAdd(){
    const alert = await this.alertCtrl.create({
      header: 'Adicionar uma task',
      inputs: [
        {
          name: 'taskName',
          type: 'text',
          placeholder: 'Nome da task'
        },
        {
          name: 'taskStart',
          type: 'time',
          placeholder: 'Horário de Início',
          min: 0,
        },
        {
          name: 'taskFinal',
          type: 'time',
          placeholder: 'Horário final',
          min: 0,
        },
        {
          name: 'taskTimer',
          type: 'number',
          placeholder: 'Execução (minutos) Indicado 50',
          min: 0,
        },
        {
          name: 'restTimer',
          type: 'number',
          placeholder: 'Descanso (minutos) Indicado 10',
          min: 0,
        }

      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'dark',
          handler: () => {
            console.log('clicked cancel');
          }
        },
        {
          text: 'Adicionar',
          handler: (form => {
            this.add(form.taskName, form.taskStart, form.taskFinal, form.taskTimer, form.restTimer);
            this.totalTasks++;
          })
        }
      ]
    });
    await alert.present();
  }

  async add(taskName : string, taskStart : string , taskFinal : string, taskTimer : number, restTimer : number) {
    //validar se o usuário preencheu
    if (taskName.trim().length < 1) {
      const toast = await this.toastCtrl.create({
        message : 'Informe o que deseja fazer',
        duration : 2000,
        position : 'top',
      });
      
      toast.present();
      return;
    }

    let task = { taskName, status: 'pause', open: false, taskStart, taskFinal, taskTimer, restTimer };

    this.tasks.push(task);

    this.todoService.add(task)
      .then(async (res) => {
        console.log(res);
        const toast = await this.toastCtrl.create({
          message : 'Task adicionada com sucesso!',
          duration : 2000,
          position : 'top',
        });

        toast.present();
        this.loadTasks();
      })
      .catch(async (err) => {
        console.error(err);
        const toast = await this.toastCtrl.create({
          message : 'Algo deu errado ao adicionar a task!',
          duration : 2000,
          position : 'top',
        });

        toast.present();
      });
    // this.updateLocalStorage();
  } 

  updateLocalStorage() {
    localStorage.setItem('taskDb', JSON.stringify(this.tasks));
    if (!this.tasks) {
      this.totalTasks = 0;
      this.doneTasks = 0;
    }
  }

  async onClick(task : any) {

    task.open = !task.open;

    task.status = 'doing';
    this.isRest = false;

    this.updateLocalStorage();
  }
  
  onTimerClick(task : any) {
    if(task.status === 'pause') { 
      task.status = 'doing';
      this.isRest = false;
    } else if (task.status === 'doing') {
      task.status = 'pause';
      this.isRest = true;
    }
  }

  startTimer() {
    
  }

  async taskOption(task : any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'O que deseja fazer?',
      cssClass: 'dark',
      buttons: [{
        text: 'Excluir',
        icon: 'trash',
        handler: () => {
          this.deleteTask(task);
        }
      },
      {
        text: 'Editar',
        icon: 'create',
        handler: () => {
          
        this.todoService.update(task)
        .then(async (res) => {
          console.log(res);
          const toast = await this.toastCtrl.create({
            message : 'Task editada com sucesso!',
            duration : 2000,
            position : 'top',
          });

          toast.present();
        })
        .catch(async (err) => {
          console.error(err);
          const toast = await this.toastCtrl.create({
            message : 'Algo deu errado ao editar a task!',
            duration : 2000,
            position : 'top',
          });

          toast.present();
  });
        }
      },
      {
        text: 'Cancelar',
        icon: 'close',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  deleteTask(task : any) {
    // this.tasks = this.tasks.filter(taskArray => task != taskArray);
    // this.updateLocalStorage();
    // if(this.totalTasks > 0) { this.totalTasks-- }
    // if(task.status==='done') { this.doneTasks++ }
    this.todoService.delete(task.id)
      .then(async (res) => {
        console.log(res);
        const toast = await this.toastCtrl.create({
          message : 'Task excluída com sucesso!',
          duration : 2000,
          position : 'top',
        });

        toast.present();
        this.loadTasks();
      })
      .catch(async (err) => {
        console.error(err);
        const toast = await this.toastCtrl.create({
          message : 'Algo deu errado ao excluir a task!',
          duration : 2000,
          position : 'top',
        });

        toast.present();
      });
  }

  handleEventTask(event, task) {
    if(event.action === 'done') {
      task.status = 'done';
      this.doneTasks++;
    } else {
      task.status = 'doing'
    }
  }

  handleEventRest(event, task) {
    if(event.action === 'done') {
      this.isRest = false;
      task.status = 'doing';
    }
  }
}
