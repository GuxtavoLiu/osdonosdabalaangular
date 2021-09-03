import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {RestApiService} from "../_helpers/rest-api/rest-api.service";
import {HandleError, HttpErrorHandler} from "../_helpers/http-error-handler.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private handleError: HandleError;
    private API_URL = environment.baseUrl + "/test";

    constructor(private api: RestApiService, httpErrorHandler: HttpErrorHandler, private http: HttpClient) {
        this.handleError = httpErrorHandler.createHandleError('UserService');

    }

    getPublicContent(): Observable<any> {
        return this.http.get(this.API_URL + '/all', {responseType: 'text'});
    }

    getUserBoard(): Observable<any> {
        return this.http.get(this.API_URL + '/user', {responseType: 'text'});
    }

    getModeratorBoard(): Observable<any> {
        return this.http.get(this.API_URL + '/mod', {responseType: 'text'});
    }

    getAdminBoard(): Observable<any> {
        return this.http.get(this.API_URL + '/admin', {responseType: 'text'});
    }
}
