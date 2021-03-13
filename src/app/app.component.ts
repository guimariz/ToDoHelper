import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'ToDo Helper', url: 'helper-todo', icon: 'information-circle' },
    { title: 'ToDo Diário', url: 'daily-todo', icon: 'sunny' },
    { title: 'ToDo Semanal', url: 'weekly-todo', icon: 'barbell' },
    { title: 'ToDo Mensal', url: 'monthly-todo', icon: 'bar-chart' },
    { title: 'ToDo Anual', url: 'annually-todo', icon: 'diamond' },
    { title: 'ToDo Urgente!', url: 'urgent-todo', icon: 'warning' },
    { title: 'Estatísticas', url: 'statistics', icon: 'stats-chart' },
  ];
  constructor() {}
}
