import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from "rxjs/operators";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class RestApiService {
    url = environment.baseUrl

    constructor(private http: HttpClient) {
    }

    get(endpoint: string, params?: any, reqOpts?: any) {
        if (!reqOpts) {
            reqOpts = {
                params: new HttpParams()
            };
        }

        // Support easy query params for GET requests
        if (params) {
            reqOpts.params = new HttpParams();
            for (let k in params) {
                reqOpts.params = reqOpts.params.set(k, params[k]);
            }
        }

        return this.http.get(this.url + '/' + endpoint, reqOpts).pipe(map((res: any) => {
            if (!!res && res.content === undefined) {
                res.content = res;
            }
            return res;
        }));
    }

    post(endpoint: string, body: any, reqOpts?: any) {
        return this.http.post(this.url + '/' + endpoint, body, reqOpts).pipe(map((res: any) => {
            if (!!res && res.content === undefined) {
                res.content = res;
            }
            return res;
        }));
    }

    put(endpoint: string, body: any, reqOpts?: any) {
        return this.http.put(this.url + '/' + endpoint, body, reqOpts).pipe(map((res: any) => {
            if (!!res && res.content === undefined) {
                res.content = res;
            }
            return res;
        }));
    }

    delete(endpoint: string, reqOpts?: any) {
        return this.http.delete(this.url + '/' + endpoint, reqOpts).pipe(map((res: any) => {
            if (!!res && res.content === undefined) {
                res.content = res;
            }
            return res;
        }));
    }

    patch(endpoint: string, body: any, reqOpts?: any) {
        return this.http.patch(this.url + '/' + endpoint, body, reqOpts).pipe(map((res: any) => {
            if (!!res && res.content === undefined) {
                res.content = res;
            }
            return res;
        }));
    }

    download(endpoint: string, body: any, reqOpts?: any) {
        reqOpts = reqOpts || {};
        reqOpts.responseType = 'blob';
        return this.http.post(this.url + '/' + endpoint, body, reqOpts).pipe(map((res: any) => {
            return res;
        }));
    }
}
