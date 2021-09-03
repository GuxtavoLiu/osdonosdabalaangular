import {Injectable} from '@angular/core';
// @ts-ignore
import * as FileSaver from 'file-saver';

@Injectable({
    providedIn: 'root'
})
export class UtilService {

    constructor() {
    }

    //***********************************************************
    /**
     * Método faz o download de bytes passados por parametro
     * @param {type} obj seja o ArquivoVo ou o próprio arquivo o conteudo
     * @param {type} nome nome do arquivo
     * @param {type} tipo tipo do arquivo
     */
    download(obj: any, nome: string, tipo?: string): void {
        if (obj) {
            if (obj.arquivo && obj.nmAnexo) {
                nome = obj.nmAnexo;
                obj = obj.arquivo;
            }
            if (!tipo && nome.indexOf(".") > -1) {
                const tipoArr = nome.split(".");
                tipo = nome.split(".")[tipoArr.length - 1];
            }

            const blobObject = this.b64toBlob(obj, tipo, null);

            if (window.navigator.msSaveOrOpenBlob !== undefined) {
                window.navigator.msSaveOrOpenBlob(blobObject, nome);
            } else if (window.navigator.msSaveBlob !== undefined) {
                window.navigator.msSaveBlob(blobObject, nome);
            } else {
                //saveAs(blobObject, nome);
                FileSaver.saveAs(blobObject, nome);
            }
        }
    }

    base64ToArrayBuffer(base64: string) {
        let binaryString = window.atob(base64);
        let binaryLen = binaryString.length;
        let bytes = new Uint8Array(binaryLen);
        for (let i = 0; i < binaryLen; i++) {
            let ascii = binaryString.charCodeAt(i);
            bytes[i] = ascii;
        }
        return bytes;
    }


    isIos() {
        const userAgent = window.navigator.userAgent.toLowerCase();
        return /iphone|ipad|ipod/.test(userAgent);
    }

    /**
     * @param {type} b64Data
     * @param {type} contentType
     * @param {type} sliceSize
     * @returns {Blob}
     */
    b64toBlob(b64Data: string, contentType?: string, sliceSize?: number | null) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        let byteCharacters = atob(b64Data);
        let byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            let slice = byteCharacters.slice(offset, offset + sliceSize);

            let byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            let byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }
        let blob = new Blob(byteArrays, {type: contentType});
        return blob;
    }

    removerAcentos(value: string) {
        return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    }

    containsIgnoreCase(a: string, b: string) {
        return this.removerAcentos(a).toLowerCase().includes(this.removerAcentos(b).toLowerCase());
    }
}
