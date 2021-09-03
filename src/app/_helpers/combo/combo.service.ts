import {Injectable} from '@angular/core';
import {HandleError, HttpErrorHandler} from "../http-error-handler.service";
import {Observable} from 'rxjs';
import {RestApiService} from "../rest-api/rest-api.service";
import {catchError, map} from "rxjs/operators";
import {Info} from "../../model/info";
import {ComboFilter} from "../../filter/combo-filter";

/**
 * @service responsável por fazer as chamadas na classe ComboService do backend
 * agrupa o mapeamento de todos os combos do sistema
 *
 * @classname ComposicaoRacialService
 * @author NextAge
 */
@Injectable({
    providedIn: 'root'
})
export class ComboService {

    private API_URL = "combo/";
    private handleError: HandleError;

    /**
     * contrutor da classe ComboService
     *
     * @param api
     * @param httpErrorHandler
     */
    constructor(private api: RestApiService, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('ComboService');
    }


    /**
     * Mapeamento do método de listar do backend
     *
     * @param filtro
     * @retrun retorna um objeto Info com os dados
     */
    listExample(filtro?: ComboFilter): Observable<Info> {
        return this.api.post(this.API_URL + 'list-example/', filtro).pipe(map((res: any) => {
                return res;
            }),
            catchError(this.handleError('listExample'))
        );
    }

}
