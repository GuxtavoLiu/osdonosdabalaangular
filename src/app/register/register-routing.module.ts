import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotAuthenticatedGuard} from "../_helpers/guards/not-authenticated.guard";
import {RegisterComponent} from "./register.component";


const routes: Routes = [
    {path: '', component: RegisterComponent, canActivate: [NotAuthenticatedGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RegisterRoutingModule {
}
