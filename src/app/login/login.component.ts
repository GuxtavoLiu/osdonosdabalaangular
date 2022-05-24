import {Component, OnInit} from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormUtils} from "../_helpers/form.utils";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BaseClass} from "../_helpers/base-class";
import {User} from "../model/user";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseClass implements OnInit {
    STATE_LOGIN = "LOGIN";
    STATE_REC_SENHA = "REC_SENHA";
    stateView = this.STATE_LOGIN;

    data: any = {
        username: null,
        password: null
    };
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';
    roles: string[] = [];

    form: FormGroup;
    formRecovery: FormGroup;
    formUtils: FormUtils;
    submitted: boolean;
    formErrors?: Array<string>;
    loading = false;

    constructor(private authService: AuthService,
                private fb: FormBuilder,
                private snackbar: MatSnackBar,
                private tokenStorage: TokenStorageService) {
        super();
        this.submitted = false;

        this.form = this.fb.group({
            login: [null, [Validators.required]],
            password: [null, Validators.required]
        });
        this.formRecovery = this.fb.group({
            email: [null, [Validators.required]]
        });
        this.formUtils = new FormUtils(this.form);
    }

    ngOnInit(): void {
        if (this.tokenStorage.getToken()) {
            this.isLoggedIn = true;
            this.roles = this.tokenStorage.getUser().roles;
        }

        this.setupForm();
    }

    login(): void {
        this.submitted = true;
        if (this.form?.valid) {
            this.loading = true;
            const user: User = {
                username: this.form.get('login')?.value,
                password: this.form.get('password')?.value,
            };
            this.authService.login(user).subscribe(
                data => {
                    this.loading = false;
                    this.showMessageInfo(this.snackbar, data);
                    this.submitted = false;
                    if (data.success) {
                        const user = data.object as User;
                        this.tokenStorage.saveToken(user.accessToken!);
                        this.tokenStorage.saveUser(user);

                        this.isLoginFailed = false;
                        this.isLoggedIn = true;
                        this.roles = this.tokenStorage.getUser().roles;
                        this.reloadPage();
                    }
                },
                err => {
                    this.loading = false;
                    this.errorMessage = err.error.message;
                    this.isLoginFailed = true;
                }
            );
        }
    }

    recovery() {
        if (this.formRecovery?.valid) {
            this.loading = true;
            const user: User = {
                link: location.href,
                email: this.formRecovery?.get('email')?.value,
            };
            this.authService.recovery(user)
                .subscribe(data => {
                    this.loading = false;
                    this.showMessageInfo(this.snackbar, data);
                    this.submitted = false;
                    if (data.tipo === this.MSG_SUCCESS) {
                        this.formRecovery?.reset();
                        this.stateView = this.STATE_LOGIN;
                    }
                });
        }
    }

    reloadPage(): void {
        window.location.reload();
    }

    changeState(state: string) {
        this.stateView = state;
    }

    private setupForm() {
    }
}
