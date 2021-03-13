import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonthlyTodoPage } from './monthly-todo.page';

const routes: Routes = [
  {
    path: '',
    component: MonthlyTodoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonthlyTodoPageRoutingModule {}
