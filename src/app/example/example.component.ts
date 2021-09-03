import {debounceTime, distinctUntilChanged, tap} from "rxjs/operators";
import {fromEvent, Observable} from "rxjs";
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BaseClass} from "../_helpers/base-class";
import {Constants} from "../model/constants";
import {DialogDeleteComponent} from "../_helpers/dialogs/dialog.delete.component";
import {Info} from "../model/info";
import {Example} from "../model/example";
import {ExampleFilter} from "../filter/example-filter";
import {ExampleService} from "./example.service";
import {AuthService} from "../_services/auth.service";
import {TokenStorageService} from "../_services/token-storage.service";
import {ValidatorsCL} from "../_helpers/validatorsCL";
import {ComboFilter} from "../filter/combo-filter";
import {AutocompleteFilter} from "../filter/autocomplete-filter";
import {AutocompleteObjectExample} from "./autocomplete-object-example";
import {AutoCompleteService} from "../_helpers/autocomplete/autocomplete.service";
import {ComboService} from "../_helpers/combo/combo.service";
import {Pagination} from "../model/pagination";

/**
 * @component agrupa as telas de consulta e manutenção da funcionalidade de Example
 *
 * @classname ExampleComponent
 * @author NextAge
 */
@Component({
    selector: 'app-associacao',
    templateUrl: './example.component.html',
    styleUrls: ['./exemplo.component.scss']
})
export class ExampleComponent extends BaseClass implements OnInit {
    public STATE_LIST = "LIST";
    public STATE_MANUT = "MANUT";
    public stateView: string = this.STATE_LIST;

    /*ViewChild faz o bind com os campos na tela*/
    @ViewChild('searchId', {read: ElementRef}) searchId?: ElementRef;
    @ViewChild('inputAutocomplete', {read: ElementRef}) inputAutocomplete?: ElementRef;

    loading = false;
    limit = false;
    comboList = [];

    // LISTAR - variaveis
    filter: ExampleFilter = {
        pagination: new Pagination()
    };
    listExample: Example[] = [];
    columns = ['id', 'text', 'cnpj', 'email', 'autocompleteObjectExample'];

    // EDITAR - variaveis
    selected = new Example();
    form!: FormGroup;

    observableAutocomplete: Observable<AutocompleteObjectExample[]> = new Observable<AutocompleteObjectExample[]>();

    /**
     * Construtor da classe ExampleComponent
     *
     * @param formBuilder
     * @param service
     * @param autoCompleteService
     * @param authService
     * @param tokenStorageService
     * @param comboService
     * @param snackBar
     * @param dialog
     */
    constructor(private formBuilder: FormBuilder,
                private service: ExampleService,
                private authService: AuthService,
                private tokenStorageService: TokenStorageService,
                private autoCompleteService: AutoCompleteService,
                private comboService: ComboService,
                private snackBar: MatSnackBar,
                private dialog: MatDialog) {
        super();
    }

    /**
     * Está funcão é chamada ao terminar de carregar a tela
     */
    ngOnInit() {
        this.user = this.tokenStorageService.getUser();

        this.form = this.formBuilder.group({
            text: ['', Validators.required],
            cnpj: ['', [Validators.required, ValidatorsCL.validateCNPJ]],
            combobox: ['', Validators.required],
            data: ['', [Validators.required]],
            radiobutton: ['', Validators.required],
            autocompleteObjectExample: [null, []],
            email: ['', ValidatorsCL.validateEmail],
        });
        this.list();
        this.loadCombo();

    }


    /**
     * funcao generica pra carregar todos combos necessários para os filtros a na manutenção
     */
    loadCombo() {
        this.loading = true;

        let comboFilter = new ComboFilter();
        this.comboService.listExample(comboFilter).subscribe((info: Info) => {
            if (info.success) {
                this.comboList = info.object;
            } else {
                this.showMessageInfo(this.snackBar, info);
            }
            this.loading = false;
        }, (error: any) => {
            console.log(error);
            this.showError(this.snackBar, Constants.listComboError);
        });
    }


    //*******************************************
    //STATE LISTA
    /**
     * Função utilizada para consultar os registros da lista na tela,
     * monta o filtro de paginação para trazer a 1º pagina
     */
    list() {
        this.loading = false;
        this.limit = false;
        this.filter.pagination = new Pagination();
        this.filter.pagination.size = 10;// this.mobile ? 15 : 40;
        this.listExample = [];
        this.listarPaginado(true);
    }

    /**
     * Função utilizada para consultar os registros da lista na tela,
     * busca registros do backend
     */
    listarPaginado(exibeLoading = true) {
        if (this.loading || this.limit) {
            return;
        }
        if (exibeLoading) {
            this.loading = true;
        }
        this.service.dashboard(this.filter).subscribe(info => {
            this.showMessageInfo(this.snackBar, info);
            let error = !info.success;
            let lista: Example[] = [];
            if (info.success) {
                let data = info.object;
                this.filter.pagination = {
                    asc: this.filter.pagination.asc,
                    order: this.filter.pagination.order,
                    size: data.size,
                    totalElement: data.totalElements,
                    page: data.pageable.pageNumber
                };
                if (data && data.content && data.content.length > 0) {
                    lista = data.content as Example[];
                }
            }
            this.loading = false;
            this.listExample = lista; //this.list.concat(list);

            if (!error && this.listExample.length >= this.filter.pagination!.totalElement) {
                this.limit = true;
            }
        }, (error: any) => {
            console.log(error);
            this.showError(this.snackBar, Constants.listError);
        });
    }

    //*******************************************
    //STATE MANUT
    /**
     * @TODO Implementar lógica de acordo com a necessidade, o trecho abaixo serve como exemplo
     *
     * Função abre o modal de confirmação de excluir,
     * se clicar em SIM, então é feito exclusão lógica do registro no backend
     */
    excluir() {
        const dialogRef = this.dialog.open(DialogDeleteComponent, {
            width: '300px', disableClose: false,
            data: {title: 'Atenção!', message: Constants.deleteMessage('Dados')}
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {//retorna true se clicar em sim
                this.loading = true;
                this.service.delete(this.selected)
                    .subscribe((info: Info) => {
                            this.showMessageInfo(this.snackBar, info);
                            this.loading = false;
                            if (info.success) {
                                this.novo();
                                this.list();
                                this.voltarLista();
                            }
                        },
                        (error: any) => {
                            this.loading = false;
                            console.log('Erro ao excluir.' + error);
                        });
            }
        });
    }

    /**
     * Função chamada ao clicar item na lista,
     * busca o registro completo no backend e disponibiliza pra edição
     *
     * @param obj
     */
    editar(obj: Example) {
        this.form?.reset();
        this.stateView = this.STATE_MANUT;
        this.selected = new Example();
        this.loading = true;
        this.service.get(obj.id!).subscribe((info: Info) => {
                this.showMessageInfo(this.snackBar, info);
                this.loading = false;
                if (info.success) {
                    this.selected = info.object as Example;
                    this.form?.setValue({
                        'text': this.selected.text,
                        'cnpj': this.selected.cnpj,
                        'combobox': this.selected.combobox,
                        'data': this.selected.data,
                        'radiobutton': this.selected.radiobutton ? '1' : '0',
                        'email': this.selected.email,
                        'autocompleteObjectExample': this.selected.autocompleteObjectExample,
                    });
                }
            },
            (error: any) => {
                console.log('Erro ao salvar registro.' + error);
            });
    }

    /**
     * Retorna a mensagem de erro quando:
     * o campo é obrigatório e não foi preenchido
     * o formato do email é invalido
     * o formato do CNPJ é invalido
     * @param field
     */
    getErrorMessage(field: string) {
        return super.getErrorMessage(field, this.form!);
    }

    /**
     * Disponibiliza o arquivo de constantes na ser utilizado na tela
     * @return constants
     */
    get constants() {
        return Constants;
    }

    /**
     * Válida se os campos do formulário estão preenchidos corretamente,
     * em seguida salva o registro no backend
     */
    salvar(): void {
        if (this.form?.valid) {
            this.loading = true;
            this.selected.text = this.form.value.text;
            this.selected.cnpj = this.form.value.cnpj;
            // this.objSelecionado.autocompleteObjectExample = this.form.value.autocompleteObjectExample;
            this.selected.combobox = this.form.value.combobox;
            this.selected.data = this.form.value.data;
            this.selected.radiobutton = this.form.value.radiobutton == '1';
            this.selected.email = this.form.value.email;

            this.service.save(this.selected).subscribe((info: Info) => {
                    this.showMessageInfo(this.snackBar, info);
                    this.loading = false;
                    if (info.success) {
                        this.list();
                        this.selected = info.object as Example;
                    }
                },
                (error: any) => {
                    console.log('Erro ao salvar registro.' + error);
                });

        } else {
            this.showError(this.snackBar, Constants.requiredFieldsError);
        }
    }

    /**
     * Limpa o formulario de manutenção na tela
     */
    novo() {
        this.form?.reset();
        this.stateView = this.STATE_MANUT;
        this.selected = new Example();
        this.form?.setValue({
            'text': '',
            'cnpj': '',
            'combobox': null,
            'data': null,
            'radiobutton': '0',
            'email': '',
            'autocompleteObjectExample': null
        });
    }

    /**
     * Função utilizada na tela de manutenção pra voltar pra lista
     */
    voltarLista() {
        this.stateView = this.STATE_LIST;
    }

    /**
     * Limpa os filtros na tela de lista,
     * em seguida lista os registros novamente
     */
    limparFiltro() {
        this.searchId!.nativeElement.value = "";
        this.filter = new ExampleFilter();
        this.list();
    }

    /**
     * Formata label do componente de Auytocomplete
     * @param item
     */
    formataAutoComplete(item: AutocompleteObjectExample): any {
        return !!item ? item.description : item;
    }

    /**
     * Função que faz o mapeamento dos eventos de keyup nos filtros,
     * assim quando o usuário parar de digitar e carregado a lista automaticamente
     */
    ngAfterViewInit() {

        fromEvent(this.searchId!.nativeElement, 'keyup')
            .pipe(
                debounceTime(250),
                distinctUntilChanged(),
                tap(() => {
                    this.filter.id = this.searchId!.nativeElement.value;
                    this.list();
                })
            )
            .subscribe();

        fromEvent(this.inputAutocomplete!.nativeElement, 'keyup')
            .pipe(
                debounceTime(250),
                distinctUntilChanged(),
                tap(() => {
                    let filtroAC = new AutocompleteFilter();
                    filtroAC.descricao = this.inputAutocomplete!.nativeElement.value;
                    if (filtroAC.descricao && filtroAC.descricao.length > 2) {
                        this.observableAutocomplete = this.autoCompleteService.listExample(filtroAC);
                    } else {
                        this.observableAutocomplete = new Observable<AutocompleteObjectExample[]>();
                    }
                })
            )
            .subscribe();
    }
}
