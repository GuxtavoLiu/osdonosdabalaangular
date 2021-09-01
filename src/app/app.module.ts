import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {IConfig, NgxMaskModule} from "ngx-mask";
import {LayoutModule} from "@angular/cdk/layout";
import {AppMaterialModule} from "./app-material/app-material.module";
import {CoreModule} from "./core/core.module";
import {httpInterceptorProviders} from "./_helpers/http-interceptors/httpInterceptorProviders";
import {AuthGuard} from "./_helpers/guards/auth.guard";
import {RoleGuard} from "./_helpers/guards/role.guard";
import {AuthService} from "./_services/auth.service";
import {NotAuthenticatedGuard} from "./_helpers/guards/not-authenticated.guard";
import {APP_BASE_HREF, registerLocaleData} from "@angular/common";
import {MAT_CHIPS_DEFAULT_OPTIONS} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {DateAdapter, MAT_DATE_FORMATS} from "@angular/material/core";
import {HttpErrorHandler} from "./_helpers/http-error-handler.service";
import {APP_DATE_FORMATS, AppDateAdapter} from "./_helpers/data-adapter";
import localept from '@angular/common/locales/pt';
import localees from '@angular/common/locales/es';
import localeen from '@angular/common/locales/en';

registerLocaleData(localept, 'pt');
registerLocaleData(localees, 'es');
registerLocaleData(localeen, 'en');

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        LayoutModule,
        AppMaterialModule,
        CoreModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            // Register the ServiceWorker as soon as the app is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        }),
        NgxMaskModule.forRoot(),
    ],
    providers: [
        httpInterceptorProviders,
        HttpErrorHandler,
        AuthGuard,
        RoleGuard,
        AuthService,
        NotAuthenticatedGuard,
        {provide: APP_BASE_HREF, useValue: '/'},
        {provide: LOCALE_ID, useValue: 'pt'},
        {
            provide: MAT_CHIPS_DEFAULT_OPTIONS,
            useValue: {
                separatorKeyCodes: [ENTER, COMMA]
            }
        },
        {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},
        {provide: DateAdapter, useClass: AppDateAdapter},

    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
