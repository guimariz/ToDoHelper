import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HelperTodoPageRoutingModule } from './helper-todo-routing.module';

import { HelperTodoPage } from './helper-todo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HelperTodoPageRoutingModule
  ],
  declarations: [HelperTodoPage]
})
export class HelperTodoPageModule {}
