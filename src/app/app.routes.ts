import { Routes } from '@angular/router';
import { ListComponent } from './modules/todo-list/list/list.component';

export const routes: Routes = [
  {
    path: '',
    title: "Lista de Tarefas",
    component: ListComponent
  },
];
