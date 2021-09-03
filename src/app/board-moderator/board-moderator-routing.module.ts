import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "../_helpers/guards/auth.guard";
import {BoardModeratorComponent} from "./board-moderator.component";
import {Constants} from "../model/constants";


const routes: Routes = [
    {
        path: '',
        component: BoardModeratorComponent,
        canActivate: [AuthGuard],
        data: {roles: [Constants.ROLE_MODERATOR], nome: 'Moderator'}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BoardModeratorRoutingModule {
}
