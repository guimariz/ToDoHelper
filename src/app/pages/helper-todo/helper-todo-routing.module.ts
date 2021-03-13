import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HelperTodoPage } from './helper-todo.page';

const routes: Routes = [
  {
    path: '',
    component: HelperTodoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelperTodoPageRoutingModule {}
