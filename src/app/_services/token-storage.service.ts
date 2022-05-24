import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot} from "@angular/router";
import {BehaviorSubject} from "rxjs";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
    providedIn: 'root'
})
export class TokenStorageService {
    actualRoute?: ActivatedRouteSnapshot | undefined;
    private loggedIn = new BehaviorSubject<boolean>(false);

    constructor() {
        if (this.userSignedIn()) {
            this.loggedIn.next(true);
        }
    }

    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }

    signOut(): void {
        this.loggedIn.next(false);
        window.sessionStorage.clear();
    }

    public saveToken(token: string): void {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.setItem(TOKEN_KEY, token);
    }

    public getToken(): string | null {
        return window.sessionStorage.getItem(TOKEN_KEY);
    }

    public saveUser(user: any): void {
        window.sessionStorage.removeItem(USER_KEY);
        window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
        this.loggedIn.next(true);
    }

    public getUser(): any {
        const user = window.sessionStorage.getItem(USER_KEY);
        if (user) {
            return JSON.parse(user);
        }

        return null;
    }

    public userSignedIn(): boolean {
        return this.getUser() !== null;
    }

}
