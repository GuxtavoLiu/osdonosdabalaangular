import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login.component';
import {LoginRoutingModule} from './login-rounting.module';
import {AppMaterialModule} from "../app-material/app-material.module";

@NgModule({
    imports: [
        CommonModule,
        AppMaterialModule,
        ReactiveFormsModule,
        FormsModule,
        LoginRoutingModule
    ],
    declarations: [
        LoginComponent,
    ],
    entryComponents: []
})
export class LoginModule {
}
