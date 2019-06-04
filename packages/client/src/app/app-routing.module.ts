import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { AnonymousGuard } from './guards/anonymous.guard';

const routes: Routes = [
  { path: '', loadChildren: './main/main.module#MainModule', canActivate: [AuthenticatedGuard] },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule', canActivate: [AnonymousGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  providers: [
    AuthenticatedGuard,
    AnonymousGuard
  ]
})
export class AppRoutingModule { }
