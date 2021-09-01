import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {TokenStorageService} from "../../_services/token-storage.service";


@Injectable()

export class NotAuthenticatedGuard implements CanActivate {
    public constructor(private tokenStorageService: TokenStorageService, private router: Router) {
    }

    public canActivate() {
        if (this.tokenStorageService.userSignedIn()) {
            this.router.navigate(['']);
            return false;
        } else {
            return true;
        }
    }
}
