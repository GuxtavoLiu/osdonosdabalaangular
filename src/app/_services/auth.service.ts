import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Info} from "../model/info";
import {User} from "../model/user";
import {HandleError, HttpErrorHandler} from "../_helpers/http-error-handler.service";
import {RestApiService} from "../_helpers/rest-api/rest-api.service";
import {catchError} from "rxjs/operators";
//http://localhost:8080/api/auth/
//http://localhost:8080/api/auth/signin/
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private API_URL = "auth/";
    private readonly handleError: HandleError;

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler, private api: RestApiService) {
        this.handleError = httpErrorHandler.createHandleError('AuthService');
    }

    login(obj: User): Observable<Info> {
        return this.api.post(this.API_URL + 'signin', obj)
            .pipe(catchError(this.handleError('signin', obj)));
    }

    register(obj: User): Observable<Info> {
        return this.api.post(this.API_URL + 'signup', obj)
            .pipe(catchError(this.handleError('signup', obj)));
    }

    recovery(obj: User): Observable<any> {
        return this.api.post(this.API_URL + 'recovery', obj)
            .pipe(catchError(this.handleError('recovery', obj)));

    }
}
