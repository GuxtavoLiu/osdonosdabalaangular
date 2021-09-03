import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppMaterialModule} from "../app-material/app-material.module";
import {BoardUserComponent} from "./board-user.component";
import {BoardUserRoutingModule} from "./board-user-routing.module";

@NgModule({
    imports: [
        CommonModule,
        AppMaterialModule,
        ReactiveFormsModule,
        FormsModule,
        BoardUserRoutingModule
    ],
    declarations: [
        BoardUserComponent,
    ],
    entryComponents: []
})
export class BoardUserModule {
}
