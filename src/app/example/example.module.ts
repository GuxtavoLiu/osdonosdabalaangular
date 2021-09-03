import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';


import {AppMaterialModule} from "../app-material/app-material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ExampleComponent} from "./example.component";
import {ExampleRoutingModule} from "./example-routing.module";
import {IConfig, NgxMaskModule} from "ngx-mask";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {PaginationModule} from "../_helpers/pagination/pagination.module";
import {SharedModule} from "../_helpers/shared.module";
import {InputFileModule} from "../_helpers/inputfile/input-file.module";

export let options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
    declarations: [ExampleComponent],
    imports: [
        CommonModule,
        AppMaterialModule,
        ExampleRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        PaginationModule,
        SharedModule,
        InputFileModule,
        MatAutocompleteModule,
        NgxMaskModule.forRoot(options)

    ]
})

/**
 * @module responsavel por agrupar tudo referente a funcionalidade de Exemplo,
 * dessa forma só é carregado a funcionalidade no browser quando o modulo é chamado
 *
 * @classname ExampleModule
 * @author NextAge
 */
export class ExampleModule {
}
