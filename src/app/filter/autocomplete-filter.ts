import {GeneralFilter} from "./general-filter";

export class AutocompleteFilter extends GeneralFilter {
    maxRegisters?: number = 20;
    description?: string;
    numero?: number;
    excluded?: boolean = false;
    cancelado?: boolean = false;
}
