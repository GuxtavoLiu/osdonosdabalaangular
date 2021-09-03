import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppMaterialModule} from "../app-material/app-material.module";
import {BoardModeratorComponent} from "./board-moderator.component";
import {BoardModeratorRoutingModule} from "./board-moderator-routing.module";

@NgModule({
    imports: [
        CommonModule,
        AppMaterialModule,
        ReactiveFormsModule,
        FormsModule,
        BoardModeratorRoutingModule
    ],
    declarations: [
        BoardModeratorComponent,
    ],
    entryComponents: []
})
export class BoardModeratorModule {
}
