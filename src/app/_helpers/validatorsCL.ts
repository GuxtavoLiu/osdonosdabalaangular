import {AbstractControl} from "@angular/forms";

export class ValidatorsCL {
    public constructor() {
    }

    static validateEmail(control: AbstractControl): { [key: string]: boolean } | null {
        let email = control.value;

        let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

        if (email && email.length > 0 && !EMAIL_REGEXP.test(email)) {
            return {'email': true};
        }
        return null;
    }

    static validateCNPJ(control: AbstractControl) {
        let cnpj = control.value;
        if (cnpj == null || cnpj.length === 0) {
            return null;
        }

        cnpj = cnpj.replace(/[^\d]+/g, '');

        if (cnpj == null || cnpj.lenght === 0) {
            return null;
        }
        if (cnpj.length != 14) {
            return {'cnpj': true};
        }

        // Elimina CNPJs invalidos conhecidos
        if (cnpj == "00000000000000" ||
            cnpj == "11111111111111" ||
            cnpj == "22222222222222" ||
            cnpj == "33333333333333" ||
            cnpj == "44444444444444" ||
            cnpj == "55555555555555" ||
            cnpj == "66666666666666" ||
            cnpj == "77777777777777" ||
            cnpj == "88888888888888" ||
            cnpj == "99999999999999") {
            return {'cnpj': true};
        }

        // Valida DVs
        let tamanho = cnpj.length - 2
        let numeros = cnpj.substring(0, tamanho);
        let digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0)) {
            return {'cnpj': true};
        }

        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1)) {
            return {'cnpj': true};
        }

        return null;
    }

    static validateCPF(control: AbstractControl): { [key: string]: boolean } | null {
        let cpf = control.value;

        if (!(cpf && cpf.length >= 11 && cpf.length <= 14)) {
            return {'cpf': true};
        }
        try {
            cpf = cpf.replace(/[^\d]+/g, '');
            if (cpf == '') {
                return {'cpf': true};
            }
            // Elimina CPFs invalidos conhecidos
            if (cpf.length != 11 ||
                cpf == "00000000000" ||
                cpf == "11111111111" ||
                cpf == "22222222222" ||
                cpf == "33333333333" ||
                cpf == "44444444444" ||
                cpf == "55555555555" ||
                cpf == "66666666666" ||
                cpf == "77777777777" ||
                cpf == "88888888888" ||
                cpf == "99999999999")
                return {'cpf': true};
            // Valida 1o digito
            let add = 0;
            for (let i = 0; i < 9; i++)
                add += parseInt(cpf.charAt(i)) * (10 - i);
            let rev = 11 - (add % 11);
            if (rev == 10 || rev == 11)
                rev = 0;
            if (rev != parseInt(cpf.charAt(9)))
                return {'cpf': true};
            // Valida 2o digito
            add = 0;
            for (let i = 0; i < 10; i++)
                add += parseInt(cpf.charAt(i)) * (11 - i);
            rev = 11 - (add % 11);
            if (rev == 10 || rev == 11)
                rev = 0;
            if (rev != parseInt(cpf.charAt(10))) {
                return {'cpf': true};
            }
            return null;

        } catch (error) {
            return {'cpf': true};
        }
        return null;
    }


    static validateDate(control: AbstractControl) {
        let dateStr: string = control.value;
        let currentFormat: string = "dd/MM/yyyy";
        let valid: boolean = false;
        if (dateStr && dateStr.length > 0) {
            if (dateStr.length == currentFormat.length) {
                let separator: string = "-";
                if (currentFormat.indexOf("/") > 0) {
                    separator = "/";
                }
                let dateArray: string[] = dateStr.split(separator);
                let formatArray: string[] = currentFormat.split(separator);
                if (dateArray.length == formatArray.length) {
                    try {
                        let month = 0;
                        let year = 0;
                        let day = 0;
                        for (let i = 0; i < formatArray.length; i++) {
                            switch (formatArray[i]) {
                                case "dd": {
                                    day = parseInt(dateArray[i]);
                                    break;
                                }
                                case "MM": {
                                    month = parseInt(dateArray[i]);
                                    break;
                                }
                                case "yyyy": {
                                    year = parseInt(dateArray[i]);
                                    break;
                                }
                            }
                        }
                        if (day > 0 && day < 32) {
                            if (month > 0 && month < 13) {
                                valid = true;
                            }
                        }
                    } catch (Error) {

                    }
                }
            }
        } else {
            return null;
        }
        if (valid) {
            return null;
        } else {
            return {'data': true};
        }
    }


}
