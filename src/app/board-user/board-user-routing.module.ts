import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "../_helpers/guards/auth.guard";
import {BoardUserComponent} from "./board-user.component";
import {Constants} from "../model/constants";


const routes: Routes = [
    {
        path: '',
        component: BoardUserComponent,
        canActivate: [AuthGuard],
        data: {roles: [Constants.ROLE_USER], nome: 'User'}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BoardUserRoutingModule {
}
