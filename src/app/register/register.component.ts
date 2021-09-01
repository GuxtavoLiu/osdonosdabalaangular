import {Component, OnInit} from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {BaseClass} from "../_helpers/base-class";
import {User} from "../model/user";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent extends BaseClass implements OnInit {
    form: any = {
        username: null,
        email: null,
        password: null
    };
    isSuccessful = false;
    isSignUpFailed = false;
    errorMessage = '';

    constructor(private authService: AuthService) {
        super();
    }

    ngOnInit(): void {
    }

    onSubmit(): void {
        const {username, email, password} = this.form;
        const user: User = {
            password: password,
            username: username,
            email: email,
        };
        this.authService.register(user).subscribe(
            data => {
                console.log(data);
                this.isSuccessful = true;
                this.isSignUpFailed = false;
            },
            err => {
                this.errorMessage = err.error.message;
                this.isSignUpFailed = true;
            }
        );
    }
}
