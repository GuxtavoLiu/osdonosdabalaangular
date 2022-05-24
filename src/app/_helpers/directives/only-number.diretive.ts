import {Directive, ElementRef} from '@angular/core';

@Directive({
    selector: '[only-number]',
    host: {
        // '(keydown)': 'keydown($event)',
    },
})
export class OnlyNumberDirective {
    el: ElementRef;

    constructor(el: ElementRef) {
        this.el = el;
    }

    // keydown(event: KeyboardEvent): void {
    //     let PATTERN = /^[0-9]/;
    //     if ((!PATTERN.test(event.key) && event.key.length == 1) || event.char == ',' || event.char == '.') {
    //         event.preventDefault();
    //     } else if (this.el.nativeElement.attributes && event.key.length == 1) {
    //         let maxlength: number = -1;
    //         for (let i = 0; i < this.el.nativeElement.attributes.length; i++) {
    //             if (this.el.nativeElement.attributes[i].name == "maxlength") {
    //                 maxlength = this.el.nativeElement.attributes[i].nodeValue;
    //                 break;
    //             }
    //         }
    //         if (maxlength > 0 && this.el.nativeElement.value && this.el.nativeElement.value.length >= maxlength) {
    //             event.preventDefault();
    //         }
    //
    //     }
    //
    // }
}
