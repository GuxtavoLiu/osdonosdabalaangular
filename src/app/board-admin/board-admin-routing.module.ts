import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "../_helpers/guards/auth.guard";
import {Constants} from "../model/constants";
import {BoardAdminComponent} from "./board-admin.component";


const routes: Routes = [
    {
        path: '',
        component: BoardAdminComponent,
        canActivate: [AuthGuard],
        data: {roles: [Constants.ROLE_ADMIN], nome: 'Admin'}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BoardAdminRoutingModule {
}
