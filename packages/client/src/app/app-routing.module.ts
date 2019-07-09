import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';
import { AnonymousGuard } from './core/guards/anonymous.guard';

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
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule],
    providers: [AuthenticatedGuard, AnonymousGuard]
})
export class AppRoutingModule {}
