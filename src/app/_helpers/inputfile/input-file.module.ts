import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputFileComponent} from "./input-file.component";
import {AppMaterialModule} from "../../app-material/app-material.module";

@NgModule({
    imports: [
        CommonModule,
        AppMaterialModule,
    ],
    declarations: [
        InputFileComponent
    ],
    providers: [],
    entryComponents: [],
    exports: [InputFileComponent],
    bootstrap: [InputFileComponent],
})
export class InputFileModule {

}
