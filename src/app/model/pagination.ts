/**
 * @model é utilizado para enviar ou receber dados do backend.
 *
 * @author NextAge
 * @classname Paginacao
 */
export class Pagination {
    // quantidade total de registros da tabela que atendem os filtros
    totalElement = 0;
    // quantidade de registros que serão mostrados native tela
    size = 10;
    // pagina atual
    page = 0;
    order?: string;
    asc?: boolean;

    constructor() {
    }
}
