import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable, of} from 'rxjs';
import {Info} from "../model/info";
import {BaseClass} from "./base-class";
import {Router} from '@angular/router';


/** Type of the handleError function returned by HttpErrorHandler.createHandleError */
export type HandleError =
    (operation?: string, result?: any) => (error: HttpErrorResponse) => Observable<any>;

/** Handles HttpClient errors */
@Injectable()
export class HttpErrorHandler extends BaseClass {
    constructor(private router: Router, private snackBar: MatSnackBar) {
        super();
    }

    showOff = false;
    /** Create curried handleError function that already knows the service name */
    createHandleError = (serviceName = '') =>
        (operation = 'operation', result = {} as any) => this.handleError(serviceName, operation, result);

    /**
     * Returns a function that handles Http operation failures.
     * This error handler lets the app continue to run as if no error occurred.
     * @param serviceName = name of the data service that attempted the operation
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    handleError<T>(serviceName = '', operation = 'operation', result = {} as any) {

        return (error: HttpErrorResponse): Observable<any> => {
            //console.error(error); // log to console instead

            switch (error.status) {
                case 401:
                    let info: Info = new Info(false, 'A Sua sessão foi encerrada, faça o login novamente.');
                    localStorage.setItem("ng_info_login", JSON.stringify(info));

                    window.sessionStorage.clear();
                    this.router.navigate(['/login']);

                    break;
                case 403:

                    break;
                default:
            }

            if (error.error && error.error.result && error.error.result.desc) {
                super.showError(this.snackBar, error.error.result.desc);
            } else {
                super.showError(this.snackBar, 'Desculpe, ocorreu um erro na operação.');
            }
            // Let the app keep running by returning a safe result.
            return of({error: true, result: error});
        };
    }

    msgOffline() {
        const msg = `Você está offline`;
        setTimeout(() => {
            if (!this.showOff) {
                this.showOff = true;
                this.snackBar.open(msg, 'Atenção', {
                    duration: 5000,
                    verticalPosition: 'top'
                });
                setTimeout(() => {
                    this.showOff = false
                }, 1000);
            }
        });
    }
}


/*
 Copyright 2017-2018 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */
