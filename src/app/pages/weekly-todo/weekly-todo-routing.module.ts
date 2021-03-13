import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeeklyTodoPage } from './weekly-todo.page';

const routes: Routes = [
  {
    path: '',
    component: WeeklyTodoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeeklyTodoPageRoutingModule {}
