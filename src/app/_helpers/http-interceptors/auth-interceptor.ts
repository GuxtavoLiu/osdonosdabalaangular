import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {TokenStorageService} from "../../_services/token-storage.service";


const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private tokenStorageService: TokenStorageService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let newReq = req;

        // Get the auth token from the service.
        // const authToken = "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxIiwiaWF0IjoxNTQxNjA0MjQ0LCJzdWIiOiJqZXJyeS5uZXh0YWdlQGdtYWlsLmNvbSIsImlzcyI6IntcImlkXCI6MSxcIm5vbWVcIjpcIkplcnJ5IEFkcmlhbm8gU29hcmVzIEdyb2hzXCIsXCJsb2dpblwiOlwiamVycnkubmV4dGFnZUBnbWFpbC5jb21cIixcImRhdGFFeHBpcmFjYW9Ub2tlblwiOlwiTm92IDcsIDIwMTggMzoyNDowNCBQTVwiLFwiZGF0YUFsdGVyYWNhb1NlbmhhXCI6XCJPY3QgMjMsIDIwMTggMzo1MDo1NiBQTVwiLFwicmVxdWlzaXRhZG9Ob3ZhU2VuaGFcIjpmYWxzZSxcIm1pbnV0b3NBdHVhbGl6YXJUb2tlblwiOjEyMCxcInRpcG9UcmFuc2ljYW9cIjpcIk1cIixcInVmXCI6e1widWZcIjpcIlBSXCIsXCJub21lXCI6XCJQQVJBTsOBXCJ9LFwiY2lkYWRlXCI6e1wiY2lkYWRlXCI6XCIxNDkzXCIsXCJub21lXCI6XCJDdXJpdGliYSAoY2FwaXRhbClcIn0sXCJwZXJmaWxBY2Vzc29cIjpcIlVcIixcImV4Y2x1aWRvXCI6ZmFsc2V9In0.3XeIwb4l9B36qynI7fJGXlF7G_WyJ_-UKvB8zc5tGhM";/*this.authService.getToken();*/
        const authToken = this.tokenStorageService.getToken();
        if (authToken) {
            newReq = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + authToken)});
        }

        // send cloned request with header to the next handler.
        return next.handle(newReq);
    }
}
