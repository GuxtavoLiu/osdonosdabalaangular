import {Directive, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {MatAutocomplete} from "@angular/material/autocomplete";
import {MatInput} from "@angular/material/input";

/**
 * Controla o componente de mat-autocomplete
 */
@Directive({
    selector: '[autocompleteType]',
})
export class AutocompleteCLDiretive {
    el: ElementRef;
    valorAtual?: any;
    @Input('matAutocomplete') autocomplete: MatAutocomplete | undefined;
    @Input('autocompleteType') autocompleteType: string | undefined;
    @Output('changeObject') changeObject: EventEmitter<any> = new EventEmitter();

    constructor(el: ElementRef, private matInput: MatInput) {
        this.el = el;
        setTimeout(() => {
            if (this.changeObject.observers.length > 0) {
                setInterval(() => {
                    let value = matInput.ngControl.control?.value;
                    if (this.valorAtual && typeof value == 'string' && typeof this.valorAtual == 'object') {
                        this.valorAtual = null;
                        this.changeValueObject();
                    } else if (typeof value == 'object' && typeof this.valorAtual == 'string') {
                        this.valorAtual = value;
                        this.changeValueObject();
                    } else if (typeof value == 'object' && typeof this.valorAtual == 'object' &&
                        value != this.valorAtual) {
                        this.valorAtual = value;
                        this.changeValueObject();
                    }

                }, 500);
            }
        }, 300);
    }

    /**
     * Se o tipo do autocomplete for de objetos, então quando o usuario
     * digitar uma string de busca, não é considerado um valor válido para
     * o formulário.
     */
    @HostListener("blur")
    setInputFocusOut(): void {
        // @ts-ignore
        if (this.matInput.ngControl && this.matInput.ngControl['viewModel']) {
            // @ts-ignore
            let value = this.matInput.ngControl['viewModel'];
            if (typeof value !== this.autocompleteType) {
                this.matInput.ngControl?.control?.setValue("");
            }
        }
    }

    /**
     * Cancela os eventos disparados pela seta e a tecla enter, pois
     * essa teclas são exclusivas para seleceção de itens na lista do
     * autocomplete, então não podem ser consideradas na busca.
     * @param event
     */
    @HostListener('keydown', ['$event'])
    onKeydownHandler(event: KeyboardEvent) {
        if (event.key == 'ArrowUp' || event.key == 'ArrowDown' ||
            event.key == 'ArrowLeft' || event.key == 'ArrowRight' || event.key == 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            return;
        } else {
            if (this.valorAtual && typeof this.valorAtual == 'object') {
                this.matInput.ngControl.control?.setValue(null);
                this.valorAtual = null;
                this.changeValueObject();
            }
        }
    }

    /**
     * Cancela os eventos disparados pela seta e a tecla enter, pois
     * essa teclas são exclusivas para seleceção de itens na lista do
     * autocomplete, então não podem ser consideradas na busca.
     * @param event
     */
    @HostListener('keyup', ['$event'])
    onKeyUpHandler(event: KeyboardEvent) {
        if (event.key == 'ArrowUp' || event.key == 'ArrowDown' ||
            event.key == 'ArrowLeft' || event.key == 'ArrowRight' || event.key == 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            return;
        }
    }

    changeValueObject() {
        if (this.changeObject.observers.length > 0) {
            let valueObj: any = null;
            if (typeof this.valorAtual == 'object') {
                valueObj = this.valorAtual;
            }
            this.changeObject.emit(valueObj);
        }
    }
}
