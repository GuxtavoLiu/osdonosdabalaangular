import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppMaterialModule} from "../app-material/app-material.module";
import {ProfileComponent} from "./profile.component";
import {ProfileRoutingModule} from "./profile-routing.module";

@NgModule({
    imports: [
        CommonModule,
        AppMaterialModule,
        ReactiveFormsModule,
        FormsModule,
        ProfileRoutingModule,
    ],
    declarations: [
        ProfileComponent,
    ],
    entryComponents: []
})
export class ProfileModule {
}
