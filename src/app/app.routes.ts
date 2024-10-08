import { Routes } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "auth",
        pathMatch: 'full'
    },
    {
        path: 'auth',
        loadChildren: () => import('./components/auth/auth.module').then((m) => m.AuthModule)
    },
    {
        path: 'user',
        loadChildren: () => import('./components/user/user.module').then((m) => m.UserModule),
        // canActivate: [AuthGuard],
        // canActivateChild: [AuthGuard]
    }
];
