import { Routes } from "@angular/router";

export const authRoutes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./login/pages/login-page.component').then((m) => m.LoginPageComponent),
    }
]
