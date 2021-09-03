import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppMaterialModule} from "../app-material/app-material.module";
import {DialogConfirmComponent} from "./dialogs/dialog.confirm.component";
import {SafeHtmlPipe} from "./pipes/safe-html.pipe";
import {DialogDeleteComponent} from "./dialogs/dialog.delete.component";
import {OnlyNumberDirective} from "./directives/only-number.diretive";
import {DecimalPipe} from "./pipes/decimal.pipe";
import {AutocompleteCLDiretive} from "./directives/autocompleteCL.diretive";
import {DateAdapter, MAT_DATE_FORMATS} from "@angular/material/core";
import {FormatDateDirective} from "./directives/formatDate.diretive";
import {DialogObservationComponent} from "./dialogs/dialog.observation.component";
import {FormsModule} from "@angular/forms";
import {APP_DATE_FORMATS, AppDateAdapter} from "./data-adapter";

@NgModule({
    imports: [
        CommonModule,
        AppMaterialModule,
        FormsModule,
    ],
    declarations: [
        DialogConfirmComponent,
        DialogObservationComponent,
        DialogDeleteComponent,
        SafeHtmlPipe,
        OnlyNumberDirective,
        AutocompleteCLDiretive,
        FormatDateDirective,
        DecimalPipe,
    ],
    providers: [
        {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},
        {provide: DateAdapter, useClass: AppDateAdapter},
    ],
    entryComponents: [
        DialogDeleteComponent,
        DialogObservationComponent,
        DialogConfirmComponent
    ],
    exports: [
        DialogDeleteComponent,
        DialogObservationComponent,
        DialogConfirmComponent,
        OnlyNumberDirective,
        AutocompleteCLDiretive,
        FormatDateDirective,
        DecimalPipe
    ],
    bootstrap: [
        DialogDeleteComponent,
        DialogObservationComponent,
        DialogConfirmComponent
    ],
})
export class SharedModule {
}
