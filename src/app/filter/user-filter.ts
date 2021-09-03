import {GeneralFilter} from "./general-filter";

/**
 * @filtro é utilizado para enviar os filtros para o backend.
 *
 * @classname UserFilter
 * @author NextAge
 */
export class UserFilter extends GeneralFilter {
    id?: number;
    name?: string;
    login?: string;
}
