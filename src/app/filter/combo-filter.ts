import {GeneralFilter} from "./general-filter";

/**
 * @filtro é utilizado para enviar os filtros para o backend.
 *
 * @classname ComboFilter
 * @author NextAge
 */
export class ComboFilter extends GeneralFilter {
    id?: number;
    description?: string;
    excluded?: boolean;
}
