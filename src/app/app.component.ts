import {Component} from '@angular/core';
import {TokenStorageService} from './_services/token-storage.service';

@Component({
    selector: 'app-root',
    template: '<app-side-nav></app-side-nav>',
    // templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    isLoggedIn = false;
    showAdminBoard = false;
    showModeratorBoard = false;
    username?: string;
    private roles: string[] = [];

    constructor(private tokenStorageService: TokenStorageService) {
    }

    ngOnInit(): void {
        this.isLoggedIn = !!this.tokenStorageService.getToken();

        if (this.isLoggedIn) {
            const user = this.tokenStorageService.getUser();
            this.roles = user.roles;

            this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
            this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

            this.username = user.username;
        }
    }

    logout(): void {
        this.tokenStorageService.signOut();
        window.location.reload();
    }
}
