import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {AppMaterialModule} from '../app-material/app-material.module';

@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        AppMaterialModule,
        HomeRoutingModule
    ]
})
export class HomeModule {
}
