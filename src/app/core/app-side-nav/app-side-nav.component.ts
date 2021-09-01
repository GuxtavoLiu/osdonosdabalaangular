import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from "../../model/user";
import {Constants} from "../../model/constants";
import {TokenStorageService} from "../../_services/token-storage.service";

@Component({
    selector: 'app-side-nav',
    templateUrl: './app-side-nav.component.html',
    styleUrls: ['./app-side-nav.component.scss']
})
export class AppSideNavComponent implements OnInit {
    isLoggedIn$?: Observable<boolean> | undefined;
    user?: User;

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches)
        );

    constructor(private breakpointObserver: BreakpointObserver,
                public tokenStorageService: TokenStorageService, private chRef: ChangeDetectorRef) {
    }

    get constantes() {
        return Constants;
    }

    ngOnInit() {
        this.user = this.tokenStorageService.getUser();
        this.isLoggedIn$ = this.tokenStorageService.isLoggedIn;

        this.isLoggedIn$?.subscribe(value => {
            if (value) {
                this.user = this.tokenStorageService.getUser();

                setTimeout(() => {
                    this.user = this.tokenStorageService.getUser();
                    this.chRef.detectChanges();
                }, 1000);
            }
        });
    }

    /**
     * @TODO função para validar persmissões do usuário. Adicionar *ngIf no item que deseja fazer a validação
     * @param roles
     */
    validaPermissoes(roles: string[]) {
        return true;
    }

    onLogout(drawer?: any) {
        this.tokenStorageService.signOut();
        if (drawer) {
            drawer.toggle();
        }
    }
}
