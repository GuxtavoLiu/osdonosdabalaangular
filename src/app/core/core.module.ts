import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {AppMaterialModule} from "../app-material/app-material.module";
import {AppSideNavComponent} from "./app-side-nav/app-side-nav.component";

@NgModule({
    declarations: [AppSideNavComponent],
    exports: [AppSideNavComponent],
    imports: [
        CommonModule,
        AppMaterialModule,
        RouterModule,
    ]
})
export class CoreModule {
}
