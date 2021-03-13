import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailyTodoPage } from './daily-todo.page';

const routes: Routes = [
  {
    path: '',
    component: DailyTodoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DailyTodoPageRoutingModule {}
