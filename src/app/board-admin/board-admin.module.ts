import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppMaterialModule} from "../app-material/app-material.module";
import {BoardAdminRoutingModule} from "./board-admin-routing.module";
import {BoardAdminComponent} from "./board-admin.component";

@NgModule({
    imports: [
        CommonModule,
        AppMaterialModule,
        ReactiveFormsModule,
        FormsModule,
        BoardAdminRoutingModule
    ],
    declarations: [
        BoardAdminComponent
    ],
    entryComponents: []
})
export class BoardAdminModule {
}
