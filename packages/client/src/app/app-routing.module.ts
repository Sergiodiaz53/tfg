import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';
import { AnonymousGuard } from './core/guards/anonymous.guard';
import { AdminGuard } from './core/guards/admin.guard';

const routes: Routes = [
    {
        path: '',
        loadChildren: './modules/main/main.module#MainModule',
        canActivate: [AuthenticatedGuard]
    },
    {
        path: 'login',
        loadChildren: './modules/login/login.module#LoginPageModule',
        canActivate: [AnonymousGuard]
    },
    {
        path: 'admin',
        loadChildren: './modules/admin/admin.module#AdminModule',
        canActivate: [AdminGuard]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            preloadingStrategy: PreloadAllModules
        })
    ],
    exports: [RouterModule],
    providers: [AuthenticatedGuard, AnonymousGuard, AdminGuard]
})
export class AppRoutingModule {}
