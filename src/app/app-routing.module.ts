import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'helper-todo',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'daily-todo',
    loadChildren: () => import('./pages/daily-todo/daily-todo.module').then( m => m.DailyTodoPageModule)
  },
  {
    path: 'weekly-todo',
    loadChildren: () => import('./pages/weekly-todo/weekly-todo.module').then( m => m.WeeklyTodoPageModule)
  },
  {
    path: 'monthly-todo',
    loadChildren: () => import('./pages/monthly-todo/monthly-todo.module').then( m => m.MonthlyTodoPageModule)
  },
  {
    path: 'annually-todo',
    loadChildren: () => import('./pages/annually-todo/annually-todo.module').then( m => m.AnnuallyTodoPageModule)
  },
  {
    path: 'urgent-todo',
    loadChildren: () => import('./pages/urgent-todo/urgent-todo.module').then( m => m.UrgentTodoPageModule)
  },
  {
    path: 'statistics',
    loadChildren: () => import('./pages/statistics/statistics.module').then( m => m.StatisticsPageModule)
  },
  {
    path: 'helper-todo',
    loadChildren: () => import('./pages/helper-todo/helper-todo.module').then( m => m.HelperTodoPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
