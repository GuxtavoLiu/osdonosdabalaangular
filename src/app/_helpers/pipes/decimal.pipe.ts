import {Pipe, PipeTransform} from '@angular/core';
import {CurrencyPipe} from '@angular/common';

@Pipe({
    name: 'decimal'
})
export class DecimalPipe implements PipeTransform {
    separator: string = ",";
    thousandSeparator: string = ".";

    transform(value: number, locale: string, currency_symbol: boolean, number_format: string = '1.2-2'): string {
        if (value || value == 0) {

            let currencyPipe = new CurrencyPipe(locale);
            let new_value: string;


            new_value = value.toString().replace('.', ',');

            //Adiciona separador de milhar
            let count = 0;
            let indexOf = new_value.indexOf(this.separator);
            indexOf = indexOf < 0 ? new_value.length - 1 : (indexOf - 1);
            for (let i = indexOf; i > 0; i--) {
                count++;
                if (count == 3 && i > 0) {
                    new_value = new_value.substr(0, i) + this.thousandSeparator + new_value.substr(i);
                    count = 0;
                }
            }

            //Adiciona casas decimais
            let numberDecimal = parseInt(number_format.split("-")[1]);
            let numberDecimalValue = new_value.indexOf(this.separator) > -1 ? new_value.split(this.separator)[1].length : 0;
            while (numberDecimalValue < numberDecimal) {
                numberDecimalValue++;
                if (new_value.indexOf(this.separator) < 0) {
                    new_value += this.separator + '0';
                } else {
                    new_value += '0';
                }
            }
            while (numberDecimalValue > numberDecimal) {
                numberDecimalValue--;
                new_value = new_value.substring(0, new_value.length - 1);
            }

            return new_value;
        }
        return "";
    }

    getValor(valor: string): number {
        let valorNumber: number = 0;
        if (valor && valor.length > 0) {
            while (valor.indexOf(this.thousandSeparator) > -1) {
                valor = valor.replace(this.thousandSeparator, "");
            }
            valor = valor.replace(this.separator, ".");
        } else {
            valor = "0";
        }

        try {
            valorNumber = parseFloat(valor);
        } catch (err) {
            console.error("Erro ao converter valor: " + valor);
        }
        return valorNumber;
    }
}
