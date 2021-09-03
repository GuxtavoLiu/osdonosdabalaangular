import {Directive, ElementRef} from '@angular/core';

@Directive({
    selector: 'input[matDatepicker]',
    host: {
        '(keydown)': 'keydown($event)',
    },
})
export class FormatDateDirective {
    el: ElementRef;

    constructor(el: ElementRef) {
        this.el = el;
    }

    keydown(event: KeyboardEvent): void {
        let PATTERN = /^[0-9]/;
        let value: string = this.el.nativeElement.value;
        if (value && value.length == 10 && event.key.length == 1) {
            event.preventDefault();
        }
        if ((!PATTERN.test(event.key) && event.key.length == 1) && !(event.key == '/')) {
            event.preventDefault();
        }
        //adiciona / após digitar dias
        if (value.length == 2 && event.key.length == 1 && event.key != '/' && value.indexOf('/') == -1) {
            this.el.nativeElement.value += '/';
        }
        //adiciona / após digitar dias
        if (value.length == 5 && event.key.length == 1 && event.key != '/' && value.lastIndexOf('/', 3) > -1) {
            this.el.nativeElement.value += '/';
        }
    }
}
