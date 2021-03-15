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
  click : boolean = false;

  constructor(private alertCtrl : AlertController, private toastCtrl : ToastController, private actionSheetCtrl : ActionSheetController, private todoService : TodoService) {
    // let taskJson = localStorage.getItem('taskDb');

    // if (taskJson) {
    //   this.tasks = JSON.parse(taskJson);
    // }
    this.loadTasks();
  }

  ngOnInit() {
  }

  loadTasks() {
    this.todoService.list()
    .then(async (res : any[]) => {
      this.tasks = res;
      this.totalTasks = res.length;
      this.showDoneTasks();
    })
    .catch(async (err) => {
      console.error(err);
    });
  }

  showDoneTasks() {
    this.todoService.getDoneTasks()
    .then((res : any) => {
      this.doneTasks = res.length;
    })
    .catch();
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
          })
        }
      ]
    });
    await alert.present();
  }
  
  async add(taskName : string, taskStart : string , taskFinal : string, taskTimer : number, restTimer : number) {
    //validar se o usuário preencheu
    console.log(taskName);
    if (!taskName.trim().length) {
      const toast = await this.toastCtrl.create({
        message : 'Informe o que deseja fazer',
        duration : 2000,
        position : 'top',
      });
      
      toast.present();
      return;
    }
    
    let task = { taskName, status: 'pause', open: false, taskStart, taskFinal, taskTimer, restTimer, isReady: true };
    
    this.todoService.add(task)
    .then(async (res) => {
      console.log('Task adicionada');
      this.tasks.push(res);
      this.validateTask(res);
      const toast = await this.toastCtrl.create({
        message : 'Task adicionada com sucesso!',
        duration : 2000,
        position : 'top',
      });
      
      toast.present();
    })
    .catch(async (err) => {
      console.error(err);
      const toast = await this.toastCtrl.create({
        message : 'Algo deu errado ao adicionar a task!',
        duration : 2000,
        position : 'top',
      });

      this.loadTasks();
      
      toast.present();
    });
    // this.updateLocalStorage();
  } 

  validateTask(task) {
    
    let h2 = task.taskStart.split(":");
    let h3 = task.taskFinal.split(":");

    let d = new Date();

    let data1 = new Date();
    let data2 = new Date(d.getFullYear(), d.getMonth(), d.getDate(), h2[0], h2[1]);
    let data3 = new Date(d.getFullYear(), d.getMonth(), d.getDate(), h3[0], h3[1]);

    task.isReady = data1 >= data2 && data1 <= data3;

    this.todoService.update(task)
    .then((res) => { console.log('isReady atualizado') })
    .catch((err) => { 
      console.log(err)
     });

  }
  // updateLocalStorage() {
    //   localStorage.setItem('taskDb', JSON.stringify(this.tasks));
    //   if (!this.tasks) {
      //     this.totalTasks = 0;
      //     this.doneTasks = 0;
  //   }
  // }



  async onClick(task : any) {

    task.open = !task.open;

    task.status = 'doing';
    this.isRest = false;
    this.validateTask(task);

    // this.updateLocalStorage();
    this.todoService.update(task)
    .then((res) => { console.log('Status atualizado') })
    .catch((err) => { 
      console.log(err) 
    });
    
  }
  
  onTimerClick(task : any) {
    if(task.status === 'pause') { 
      task.status = 'doing';
      this.isRest = false;
    } else if (task.status === 'doing') {
      task.status = 'pause';
      this.isRest = true;
    }
    this.todoService.update(task)
    .then((res) => { console.log('Status atualizado') })
    .catch((err) => { 
      
      console.log(err) 
    });
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
          console.log('Task editada');
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

    this.todoService.delete(task.id)
      .then(async (res) => {
        console.log('Task excluída');
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

  async handleEventTask(event, task) {

    console.log(event);

    this.validateTask(task);

    if(event.action === 'done' && !task.isReady) {
      task.status = 'done';
      const toast = await this.toastCtrl.create({
        message : 'Parabéns, você concluiu a task!',
        duration : 2000,
        position : 'top',
      });
      this.todoService.update(task)
      .then((res) => { 
        this.showDoneTasks();
        console.log('Execução finalizada');
      })
      .catch((err) => { 
        
        console.log(err)
        });
      
      toast.present();
      
    } else if (event.action ==='done' && task.isReady) {
      this.isRest = true;
      task.status = 'pause';
    } 
    else {
      task.status = 'doing';
    }
    this.todoService.update(task)
    .then((res) => { console.log('Descanso finalizado') })
    .catch((err) => { 
      
      console.log(err) 
    });
  }

  async handleEventRest(event, task) {

    this.validateTask(task);
    
    if(event.action === 'done' && !task.isReady) {
      
      task.status = 'done';
      const toast = await this.toastCtrl.create({
        message : 'Parabéns, você concluiu a task!',
        duration : 2000,
        position : 'top',
      });
      this.todoService.update(task)
      .then((res) => { 
        this.showDoneTasks();
        console.log('Execução finalizada');
      })
      .catch((err) => { console.log(err) });
      
      toast.present();
    } else if (event.action ==='done' && task.isReady) {
      
      this.isRest = false;
      task.status = 'doing';
    }
    this.todoService.update(task)
    .then((res) => { console.log('Descanso finalizado') })
    .catch((err) => { 
      console.log(err) 
      
    });
  }

  resetTasks() {

    this.click = !this.click;
    console.log(this.click);

    let d = new Date();

    let resetTime = '06:00'
    let r = resetTime.split(":").toString;

    let data1 = new Date;
    let data2 = new Date(d.getFullYear(), d.getMonth(), d.getDate(), r[0], r[1]);

    if (data1 === data2) { 
      this.todoService.resetTasks()
      .then((res) => { console.log(res) })
      .catch((err) => { console.error(err) });
    }

  }

}
