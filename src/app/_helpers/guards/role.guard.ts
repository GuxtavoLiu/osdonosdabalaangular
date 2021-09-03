import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {TokenStorageService} from "../../_services/token-storage.service";
import {User} from "../../model/user";


@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {


    public constructor(private tokenStorageService: TokenStorageService, private router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        let ok = false;
        const user = this.tokenStorageService.getUser() as User;
        if (user) {
            const userRoles = user.roles ? user.roles : [];
            const roles = next.data.roles as [];
            if (roles.length === 0) {
                ok = true;
            } else {
                userRoles.forEach(userRole => {
                    if (!ok && roles.filter(role => role === userRole).length > 0) {
                        ok = true;
                    }
                });
            }
        }

        if (!ok) {
            this.router.navigate(['/home']);
        }

        return ok;
    }

}
