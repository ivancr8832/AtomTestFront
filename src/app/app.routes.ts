import { Routes } from '@angular/router';
import { authRoutes } from './views/auth/auth.routes';
import { taskRoutes } from './views/tasks/task.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  ...authRoutes,
  ...taskRoutes
];
