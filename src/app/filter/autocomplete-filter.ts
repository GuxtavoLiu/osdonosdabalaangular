import {GeneralFilter} from "./general-filter";

export class AutocompleteFilter extends GeneralFilter {
    size?: number = 20;
    description?: string;
    numero?: number;
    excluded?: boolean = false;
    active?: boolean;
}
