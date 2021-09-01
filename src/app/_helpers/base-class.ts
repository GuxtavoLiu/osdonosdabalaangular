import {MatSnackBar} from "@angular/material/snack-bar";
import {Directive, ElementRef, HostListener, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Info} from "../model/info";
import {fromEvent, merge, Observable, of} from 'rxjs';
import {mapTo} from 'rxjs/operators';
import {User} from "../model/user";
import {Constants} from "../model/constants";

@Directive()
export class BaseClass implements OnInit {

    public MSG_WARNING = "warning";
    public MSG_DANGER = "danger";
    public MSG_SUCCESS = "success";
    // public $ = $;

    innerWidth: any;
    mobile = false;
    deferredPrompt?: { prompt: () => Promise<any>; userChoice: Promise<any>; } | null | undefined;
    appInstall = false;
    showInstallApp = false;
    user?: User;

    online$: Observable<boolean> | undefined;
    online = true;

    constructor() {
        this.checkOnline();
    }

    ngOnInit() {
        this.checkWidthMobile();
    }

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.checkWidthMobile();
    }

    checkWidthMobile() {
        this.innerWidth = window.innerWidth;
        this.mobile = this.innerWidth <= 576;
        return this.mobile;
    }

    public showMessageInfo(snackBar: MatSnackBar, info: Info): void {
        if (info && info.message) {
            this.showMessage(snackBar, info.message, info.success);
        }
    }

    public showError(snackBar: MatSnackBar, message: string): void {
        this.showMessage(snackBar, message, false);
    }

    public showSuccess(snackBar: MatSnackBar, message: string): void {
        this.showMessage(snackBar, message, true);
    }

    public showMessage(snackBar: MatSnackBar, message: string, success: boolean): void {
        let msg = "Ok";
        if (!success) {
            msg = "Erro";
        }

        snackBar.open(message, msg, {
            duration: 6000,
        });
    }

    isInvalidMailFormat(field: string, form: FormGroup) {
        const email = form.get(field)?.value;

        const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

        if (email && (email.length <= 5 || !EMAIL_REGEXP.test(email))) {
            form.get(field)?.setErrors({incorrect: true});
            return true;
        }
        if (!this.isFieldEmpt(field, form)) {
            form.get(field)?.setErrors(null);
        }
        return false;
    }

    isFieldEmpt(field: string, form: FormGroup) {
        const value = form.get(field)?.value;
        if (value == null || value.length === 0) {
            form.get(field)?.setErrors({incorrect: true});
            return false;
        }

        return true;
    }

    getBase64(file: Blob): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    }

    public setFocusInput(inputEl: ElementRef) {
        if (inputEl) {
            setTimeout(() => inputEl.nativeElement.focus());
        }
    }

    base64ToArrayBuffer(base64: string) {
        const binaryString = window.atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    }


    addApp(): Promise<any> {
        if (this.appInstall || !this.deferredPrompt) {
            return Promise.reject();
        }
        try {
            // Show the prompt
            this.deferredPrompt.prompt().then((test) => {
                console.log(test);
                return test;
            });
            // Wait for the user to respond to the prompt
            return this.deferredPrompt.userChoice
                .then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        this.appInstall = true;
                        this.showInstallApp = false;
                        console.log('User accepted the prompt');
                    } else {
                        this.showInstallApp = true;
                        console.log('User dismissed the prompt');
                    }
                    this.deferredPrompt = null;
                    return choiceResult;
                });
        } catch (err) {
            this.showInstallApp = true;
            console.log(err);
            // Throw error here
            throw(err)
        }
    }

    isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator['standalone']);

    // Detecta se o dispositivo está no iOS
    isIos = () => {
        const userAgent = window.navigator.userAgent.toLowerCase();
        return /iphone|ipad|ipod/.test(userAgent);
    };

    checkDownload() {
        return !(this.isIos() && this.isInStandaloneMode());
    }

    checkOnline() {
        this.online$ = merge(
            of(navigator.onLine),
            fromEvent(window, 'online').pipe(mapTo(true)),
            fromEvent(window, 'offline').pipe(mapTo(false))
        );
        setTimeout(() => {
            this.online = navigator.onLine;
        }, 1000);

        fromEvent(window, 'online').subscribe((item: any) => {
            this.online = true;
        });
        fromEvent(window, 'offline').subscribe((item: any) => {
            this.online = false;
        });
    }

    public comparar(obj: any, obj2: any): boolean {
        if ((!obj && obj) || obj && !obj2) {
            return false;
        } else if (!obj && !obj2) {
            return true;
        }
        return obj === obj2;
    }

    public compararStrings(obj: string, obj2: string): boolean {
        return obj === obj2;
    }

    getErrorMessage(field: string, form: FormGroup) {
        if (form.get(field)?.hasError('required')) {
            return Constants.requiredFieldError;
        } else if (form.get(field)?.hasError('email')) {
            return Constants.invalidEmailError;
        } else if (form.get(field)?.hasError('cnpj')) {
            return Constants.invalidCNPJError;
        } else if (form.get(field)?.hasError('cpf')) {
            return Constants.invalidCPFError;
        } else if (form.get(field)?.hasError('data')) {
            return Constants.invalidDataError;
        } else if (form.get(field)?.hasError('minlength')) {
            const tamanho: number = form.get(field)?.errors?.minlength.requiredLength;
            return "Mínimo de " + tamanho + " caracteres";
        } else if (form.get(field)?.hasError('maxlength')) {
            const tamanho: number = form.get(field)?.errors?.maxlength.requiredLength;
            return "Máximo de " + tamanho + " caracteres";
        }
        return '';
    }
}
