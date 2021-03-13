import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WeeklyTodoPageRoutingModule } from './weekly-todo-routing.module';

import { WeeklyTodoPage } from './weekly-todo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WeeklyTodoPageRoutingModule
  ],
  declarations: [WeeklyTodoPage]
})
export class WeeklyTodoPageModule {}
