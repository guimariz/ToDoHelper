import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UrgentTodoPage } from './urgent-todo.page';

const routes: Routes = [
  {
    path: '',
    component: UrgentTodoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UrgentTodoPageRoutingModule {}
