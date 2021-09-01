import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login.component';
import {NotAuthenticatedGuard} from "../_helpers/guards/not-authenticated.guard";


const routes: Routes = [
    {path: '', component: LoginComponent, canActivate: [NotAuthenticatedGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoginRoutingModule {
}
