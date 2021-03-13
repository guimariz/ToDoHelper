import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-daily-todo',
  templateUrl: './daily-todo.page.html',
  styleUrls: ['./daily-todo.page.scss'],
})
export class DailyTodoPage implements OnInit {

  tasks : any[] = [];

  constructor(private alertCtrl : AlertController, private toastCtrl : ToastController, private actionSheetCtrl : ActionSheetController) {
    let taskJson = localStorage.getItem('taskDb');

    if (taskJson) {
      this.tasks = JSON.parse(taskJson);
    }
  }

  ngOnInit() {
  }

  async showAdd(){
    const alert = await this.alertCtrl.create({
      header: 'Adicionar uma task',
      inputs: [
        {
          name: 'newTask',
          type: 'text',
          placeholder: 'Nome da task'
        },
        {
          name: 'taskStart',
          type: 'number',
          placeholder: 'Horário de Início',
          min: 0,
        },
        {
          name: 'taskFinal',
          type: 'number',
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

            this.add(form.newTask, form.taskStart, form.taskFinal, form.taskTimer, form.restTimer);
          })
        }
      ]
    });
    await alert.present();
  }

  async add(newTask : string, taskStart : number, taskFinal : number, taskTimer : number, restTimer : number) {
    //validar se o usuário preencheu
    if (newTask.trim().length < 1) {
      const toast = await this.toastCtrl.create({
        message : 'Informe o que deseja fazer',
        duration : 2000,
        position : 'top',
      });
      
      toast.present();
      return;
    }

    let task = { name : newTask, status: 'doing', timer: 0, open: false, taskStart, taskFinal, taskTimer, restTimer };

    this.tasks.push(task);

    this.updateLocalStorage();
  } 

  updateLocalStorage() {
    localStorage.setItem('taskDb', JSON.stringify(this.tasks));
  }

  async onClick(task : any) {

    task.open = !task.open;

    task.status = 'doing';

    this.updateLocalStorage();
  }
  
  onTimerClick(task : any) {
    if(task.status === 'pause') { 
      task.status = 'doing';
    } else if (task.status === 'doing') {
      task.status = 'pause';
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
          this.updateTask(task);
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
    this.tasks = this.tasks.filter(taskArray => task != taskArray);
    this.updateLocalStorage();
  }

  updateTask(task) {
    console.log('editando');
  }

  handleEventTask(event, task) {
    console.log(event.action);
    console.log(task);
    if(event.action === 'done') {
      task.status = 'done';
    } else {
      task.status === 'doing'
    }
  }


  
  handleEventRest(event, task) {

    console.log(event);
    event.action = 'pause';

  }

}
