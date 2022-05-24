import {NativeDateAdapter} from '@angular/material/core';
import {Injectable} from "@angular/core";

@Injectable()
export class AppDateAdapter extends NativeDateAdapter {

    parse(value: any): Date | null {
        if ((typeof value === 'string') && value.toString().length === 10) {
            const str = value.split('/');
            const date = Number(str[0]);
            const month = Number(str[1]) - 1;
            const year = Number(str[2]);

            if (this.isValidDate(value, "dd/MM/yyyy")) {
                return new Date(year, month, date);
            } else {
                return this.invalid();
            }
        }
        return null;
    }

    format(date: Date, displayFormat: any): string {
        if (displayFormat === 'input') {
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return this._to2digit(day) + '/' + this._to2digit(month) + '/' + year;
            // return year  + '/' + this._to2digit(month) + '/' + this._to2digit(day) ;
        } else {
            return date.toDateString();
        }
    }

    isValidDate(dateStr: string, currentFormat: string): boolean {
        let valid = false;
        if (dateStr.length === currentFormat.length) {
            let separator = "-";
            if (currentFormat.indexOf("/") > 0) {
                separator = "/";
            }
            const dateArray: string[] = dateStr.split(separator);
            const formatArray: string[] = currentFormat.split(separator);
            if (dateArray.length === formatArray.length) {
                try {
                    let month: number = 0;
                    let year: number = 0;
                    let day: number = 0;
                    for (let i = 0; i < formatArray.length; i++) {
                        switch (formatArray[i]) {
                            case "dd": {
                                // tslint:disable-next-line:radix
                                day = parseInt(dateArray[i]);
                                break;
                            }
                            case "MM": {
                                // tslint:disable-next-line:radix
                                month = parseInt(dateArray[i]);
                                break;
                            }
                            case "yyyy": {
                                // tslint:disable-next-line:radix
                                year = parseInt(dateArray[i]);
                                break;
                            }
                        }
                    }
                    if (day > 0 && day < 32) {
                        if (month > 0 && month < 13) {
                            try {
                                const dataAux: Date = new Date(year, month - 1, day);
                                if (dataAux.getDate() === day && (dataAux.getMonth() + 1) === month && dataAux.getFullYear() === year) {
                                    valid = true;
                                }
                            } catch (e) {
                            }
                        }
                    }
                } catch (Error) {

                }
            }
        }
        return valid;
    }

    private _to2digit(n: number) {
        return ('00' + n).slice(-2);
    }
}

export const APP_DATE_FORMATS = {
    parse: {
        dateInput: {day: 'numeric', month: 'short', year: 'numeric'}
    },
    display: {
        // dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
        dateInput: 'input',
        monthYearLabel: {day: 'numeric', month: 'short', year: 'numeric'},
        dateA11yLabel: {day: 'numeric', year: 'numeric', month: 'long'},
        monthYearA11yLabel: {year: 'numeric', month: 'long'},
    }
};
