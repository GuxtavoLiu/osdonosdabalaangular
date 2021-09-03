import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./_helpers/guards/auth.guard";
import {RoleGuard} from "./_helpers/guards/role.guard";

/*const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];*/

const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
    {path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)},
    {path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
    {path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)},
    {path: 'user', loadChildren: () => import('./board-user/board-user.module').then(m => m.BoardUserModule)},
    {path: 'mod', loadChildren: () => import('./board-moderator/board-moderator.module').then(m => m.BoardModeratorModule)},
    {path: 'admin', loadChildren: () => import('./board-admin/board-admin.module').then(m => m.BoardAdminModule)},
    {
        path: 'example',
        loadChildren: () => import('./example/example.module').then(m => m.ExampleModule),
        canActivate: [AuthGuard, RoleGuard],
        data: {roles: [], nome: 'Tela 1'}
    },


    {path: '**', redirectTo: '/home', pathMatch: 'full'}

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
