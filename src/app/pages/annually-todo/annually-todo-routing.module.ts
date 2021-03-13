import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnnuallyTodoPage } from './annually-todo.page';

const routes: Routes = [
  {
    path: '',
    component: AnnuallyTodoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnnuallyTodoPageRoutingModule {}
