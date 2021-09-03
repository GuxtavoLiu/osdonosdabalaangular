import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {catchError, map} from "rxjs/operators";
import {Info} from "../model/info";
import {HandleError, HttpErrorHandler} from "../_helpers/http-error-handler.service";
import {RestApiService} from "../_helpers/rest-api/rest-api.service";
import {ExampleFilter} from "../filter/example-filter";
import {Example} from "../model/example";

/**
 * @service responsável por fazer as chamadas na classe AssociacaoApi do backend
 *
 * @classname ExampleService
 * @author NextAge
 */
@Injectable({
    providedIn: 'root'
})
export class ExampleService {


    private API_URL = "examples";
    private handleError: HandleError;

    /**
     * contrutor da classe ExampleService
     *
     * @param api
     * @param httpErrorHandler
     */
    constructor(private api: RestApiService, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('ExampleService');
    }

    /**
     * Mapeamento do método de listar do backend
     *
     * @param page
     * @param size
     * @param filter
     * @param order
     * @param asc
     * @retrun retorna um objeto Info com os dados
     */
    dashboard(filter?: ExampleFilter): Observable<Info> {
        let url = `${this.API_URL}/dashboard?page=${filter?.pagination?.page}&size=${filter?.pagination?.size}`;
        if (filter?.pagination?.order) {
            url += `&order=${filter?.pagination.order}`;
        }
        if (filter?.pagination?.asc) {
            url += `&asc=${filter?.pagination.asc}`;
        }
        return this.api.post(url, filter).pipe(map((res: any) => {
                return res;
            }),
            catchError(this.handleError('list'))
        );
    }

    /**
     * Mapeamento do método de listar do backend
     *
     * @param filtro
     * @retrun retorna um objeto Info com os dados
     */
    list(filtro?: ExampleFilter): Observable<Info> {
        return this.api.get(this.API_URL + '/', filtro).pipe(map((res: any) => {
                return res;
            }),
            catchError(this.handleError('list'))
        );
    }

    /**
     * Mapeamento do método de salvar do backend
     *
     * @param obj
     * @retun retorna o objeto Info com os dados salvos
     */
    save(obj: Example): Observable<Info> {
        return this.api.post(this.API_URL + '/', obj).pipe(map((res: any) => {
            return res;
        }))
            .pipe(catchError(this.handleError('save', obj)));
    }

    /**
     * Mapeamento do método de excluir do backend
     *
     * @param obj
     * @retun retorna o objeto Info com o registro que foi excluido
     */
    delete(obj: Example): Observable<Info> {
        return this.api.delete(this.API_URL + '/delete' + obj.id, {}).pipe(map((res: any) => {
            return res;
        })).pipe(catchError(this.handleError('delete', obj)));
    }

    /**
     * Mapeamento do método de obterPorId do backend
     *
     * @param id
     * @retun retorna o objeto Info com o registro filtrado por id
     */
    get(id: number): Observable<Info> {
        return this.api.get(this.API_URL + '/' + id, {}).pipe(map((res: any) => {
            return res;
        })).pipe(catchError(this.handleError('get', id)));
    }
}
