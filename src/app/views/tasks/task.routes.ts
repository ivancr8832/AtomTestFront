import { Routes } from "@angular/router";
import { LayoutComponent } from "../layout/layout.component";
import { authGuard } from "../../core/guards/auth.guard";

export const taskRoutes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        canActivate: [authGuard],
        children: [
          {
            path: '',
            loadComponent: () => import('../tasks/pages/tasks-list/tasks-list.component').then(m => m.TasksListComponent)
          }
        ]
    }
]
