/**
 * @model é utilizado para enviar ou receber dados do backend.
 *
 * @author NextAge
 * @classname Exemplo
 */
import {Auditable} from "./auditable";
import {AutocompleteObjectExample} from "../example/autocomplete-object-example";

export class Example extends Auditable {
    id?: number;
    text?: string;
    cnpj?: string;
    autocomplete?: AutocompleteObjectExample;
    date?: Date;
    radiobutton?: boolean;
    email?: string;
    combobox?: string;
}


