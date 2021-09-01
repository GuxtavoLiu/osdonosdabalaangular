import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {TokenStorageService} from "../../_services/token-storage.service";


@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {


    public constructor(private tokenStorageService: TokenStorageService, private router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const user = this.tokenStorageService.getUser();


        let roles = next.data.roles as [];
        let ok = true;


        if (!ok) {
            this.router.navigate(['/home']);
        }

        return ok;
    }

}
