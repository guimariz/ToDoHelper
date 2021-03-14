import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { CountdownModule } from 'ngx-countdown';

import { DailyTodoPageRoutingModule } from './daily-todo-routing.module';

import { DailyTodoPage } from './daily-todo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DailyTodoPageRoutingModule,
    CountdownModule,
  ],
  declarations: [DailyTodoPage]
})
export class DailyTodoPageModule {}
