import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppMaterialModule} from "../app-material/app-material.module";
import {RegisterComponent} from "./register.component";
import {RegisterRoutingModule} from "./register-rounting.module";

@NgModule({
    imports: [
        CommonModule,
        AppMaterialModule,
        ReactiveFormsModule,
        FormsModule,
        RegisterRoutingModule
    ],
    declarations: [
        RegisterComponent,
    ],
    entryComponents: []
})
export class RegisterModule {
}
