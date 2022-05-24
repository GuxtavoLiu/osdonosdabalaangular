import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {MatDialog} from "@angular/material/dialog";
import {UtilService} from "../util.service";
import {DialogDeleteComponent} from "../dialogs/dialog.delete.component";
import {Constants} from "../../model/constants";


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'input-file',
    templateUrl: 'input-file.component.html',
    styleUrls: ['input-file.component.scss']
})

export class InputFileComponent implements OnInit {

    file: File | undefined;

    @Input() accept: string | undefined;
    @Input() exibirImagem: boolean = true;
    @Input() exibirDownload: boolean = false;
    @Input() objeto: any;
    @Input() nomePropriedadeNomeArquivo?: string;
    @Input() nomePropriedadeArquivoB64?: string;
    @Input() tipoPropriedadeArquivoB64?: string;
    @Input() disabled: boolean | undefined;
    @Input() confirmarRemocao: boolean = false;

    // tslint:disable-next-line:variable-name no-output-native no-output-rename
    @Output("change") _changeEvent = new EventEmitter();
    // tslint:disable-next-line:no-output-rename
    @Output("changeArquivoRemovido") _changeArquivoRemovido = new EventEmitter();

    idInput: string = 'inputFile' + new Date().getTime();

    constructor(private dialog: MatDialog, private utilService: UtilService) {
        const time = this.randomIntFromInterval(0, 100);
        setTimeout(() => {
            this.idInput = 'inputFile' + new Date().getTime();
        }, time);
    }

    ngOnInit() {
    }

    /**
     * min and max included
     * @param min
     * @param max
     */
    randomIntFromInterval(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    change() {
        this._changeEvent.emit(this.file);
    }

    changeArquivoRemovidoEvent() {
        this._changeArquivoRemovido.emit();
    }

    // download() {
    //     if (this.exibirDownload && this.existeArquivo()) {
    //         let nomeArquivo = this.objeto[this.nomePropriedadeNomeArquivo!] as string;
    //         const base64 = this.objeto[this.nomePropriedadeArquivoB64!] as string;
    //         if (this.tipoPropriedadeArquivoB64 && this.objeto[this.tipoPropriedadeArquivoB64] && nomeArquivo.indexOf('.') < 0) {
    //             nomeArquivo += '.' + this.objeto[this.tipoPropriedadeArquivoB64];
    //         }
    //         this.utilService.download(base64, nomeArquivo, this.objeto[this.tipoPropriedadeArquivoB64!]);
    //     }
    // }

    removerArquivo() {
        if (this.disabled) {
            return;
        }
        if (!this.confirmarRemocao) {
            if (this.objeto && this.nomePropriedadeNomeArquivo) {
                this.objeto[this.nomePropriedadeNomeArquivo] = null;
            }
            if (this.objeto && this.nomePropriedadeArquivoB64) {
                this.objeto[this.nomePropriedadeArquivoB64] = null;
            }
            if (this.objeto && this.tipoPropriedadeArquivoB64) {
                this.objeto[this.tipoPropriedadeArquivoB64] = null;
            }
            this.changeArquivoRemovidoEvent();
        } else {
            const dialogRef = this.dialog.open(DialogDeleteComponent, {
                disableClose: false,
                data: {title: 'Atenção!', message: Constants.deleteMessage('Dados')}
            });
            dialogRef.afterClosed().subscribe(
                result => {
                    if (result) {
                        if (this.objeto && this.nomePropriedadeNomeArquivo) {
                            this.objeto[this.nomePropriedadeNomeArquivo] = null;
                        }
                        if (this.objeto && this.nomePropriedadeArquivoB64) {
                            this.objeto[this.nomePropriedadeArquivoB64] = null;
                        }
                        if (this.objeto && this.tipoPropriedadeArquivoB64) {
                            this.objeto[this.tipoPropriedadeArquivoB64] = null;
                        }
                        this.changeArquivoRemovidoEvent();
                    }
                });
        }
    }

    onChangeFileInput(event: Event) {
        // const eventObj: MSInputMethodContext = event as MSInputMethodContext;
        const target: HTMLInputElement = event.target as HTMLInputElement;
        const files = target.files;
        this.file = files![0];
        const reader: FileReader = new FileReader();
        reader.onload = (e) => {
            if (this.objeto && this.nomePropriedadeNomeArquivo) {
                this.objeto[this.nomePropriedadeNomeArquivo] = this.file!.name;
            }
            if (this.objeto && this.tipoPropriedadeArquivoB64 && this.file!.name.indexOf(".") >= 0) {
                this.objeto[this.tipoPropriedadeArquivoB64] = this.file!.name.substring(this.file!.name.indexOf(".") + 1, this.file!.name.length);
            }
            if (this.objeto && this.nomePropriedadeArquivoB64) {
                this.objeto[this.nomePropriedadeArquivoB64] = reader.result!.toString();
                // @ts-ignore
                this.file['result'] = reader.result!.toString();
            }
            this.change();

            //Limpa input
            if (this.idInput) {
                const element = document.getElementsByName(this.idInput);
                if (element && element.length > 0) {
                    element[0].setAttribute('value', '');
                }
            }
        };
        reader.readAsDataURL(this.file);

        target.value = "";
        target.files = null;
    }

    existeArquivo() {
        if (!(this.objeto && this.nomePropriedadeArquivoB64 && this.objeto[this.nomePropriedadeArquivoB64])) {
            return false;
        }

        return true;
    }

    existeArquivoTipo(tipo: string) {
        if (!(this.objeto && this.nomePropriedadeArquivoB64 && this.objeto[this.nomePropriedadeArquivoB64])) {
            return false;
        }

        if (tipo === "imagem" && this.accept!.indexOf(".jpg") || this.accept!.indexOf(".png") || this.accept!.indexOf(".jpeg")) {
            return true;

        }
        return false;
    }

    selecionarArquivo() {
        document.getElementsByName(this.idInput)[0].click();
    }
}
