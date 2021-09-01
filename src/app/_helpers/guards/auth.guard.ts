import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {TokenStorageService} from "../../_services/token-storage.service";


@Injectable()
export class AuthGuard implements CanActivate {
    public constructor(private tokenStorageService: TokenStorageService, private router: Router) {
    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.tokenStorageService.userSignedIn()) {
            this.tokenStorageService.actualRoute = route;

            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }

}
