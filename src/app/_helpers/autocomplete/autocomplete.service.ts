import {Injectable} from '@angular/core';
import {HandleError, HttpErrorHandler} from "../http-error-handler.service";
import {Observable} from 'rxjs';
import {RestApiService} from "../rest-api/rest-api.service";
import {catchError, map} from "rxjs/operators";
import {Info} from "../../model/info";

import {BaseClass} from "../base-class";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AutocompleteObjectExample} from "../../example/autocomplete-object-example";
import {AutocompleteFilter} from "../../filter/autocomplete-filter";

@Injectable({
    providedIn: 'root'
})
export class AutoCompleteService {


    private API_URL = "auto-complete/";
    private handleError: HandleError;


    constructor(private api: RestApiService, httpErrorHandler: HttpErrorHandler, private snackBar: MatSnackBar,) {
        this.handleError = httpErrorHandler.createHandleError('AutoCompleteService');
    }


    listExample(filtro?: AutocompleteFilter): Observable<any> {
        return this.api.post(this.API_URL + 'list-example/', filtro).pipe(map((info: Info) => {
                let baseClass = new BaseClass();
                let lista: AutocompleteObjectExample[] = [];
                let error = !info.success;
                if (!error) {
                    lista = info.object as AutocompleteObjectExample[];
                    return lista;
                } else {
                    baseClass.showMessageInfo(this.snackBar, info);
                }
                return lista;
            }),
            catchError(this.handleError('listExample'))
        );
    }
}
