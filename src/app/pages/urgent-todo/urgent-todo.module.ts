import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UrgentTodoPageRoutingModule } from './urgent-todo-routing.module';

import { UrgentTodoPage } from './urgent-todo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UrgentTodoPageRoutingModule
  ],
  declarations: [UrgentTodoPage]
})
export class UrgentTodoPageModule {}
