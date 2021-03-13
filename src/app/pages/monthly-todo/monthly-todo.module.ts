import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MonthlyTodoPageRoutingModule } from './monthly-todo-routing.module';

import { MonthlyTodoPage } from './monthly-todo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MonthlyTodoPageRoutingModule
  ],
  declarations: [MonthlyTodoPage]
})
export class MonthlyTodoPageModule {}
