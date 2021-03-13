import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnnuallyTodoPageRoutingModule } from './annually-todo-routing.module';

import { AnnuallyTodoPage } from './annually-todo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnnuallyTodoPageRoutingModule
  ],
  declarations: [AnnuallyTodoPage]
})
export class AnnuallyTodoPageModule {}
