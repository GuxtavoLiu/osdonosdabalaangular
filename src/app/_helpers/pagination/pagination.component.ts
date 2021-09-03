import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Pagination} from "../../model/pagination";


@Component({
    selector: 'pagination',
    templateUrl: 'pagination.component.html',
    styleUrls: ['pagination.component.scss']
})

export class PaginationComponent implements OnInit {

    @Input() pagination!: Pagination;
    @Output("listar") _changeEvent = new EventEmitter();

    ngOnInit() {
    }

    first() {
        this.pagination.page = 1;
        this.list();
    }

    last() {
        this.pagination.page = this.getTotalPages();
        this.list();
    }

    next() {
        this.pagination.page++;
        this.list();
    }

    previous() {
        this.pagination.page--;
        this.list();
    }

    toPage(pagina: number) {
        this.pagination.page = pagina;
        this.list();
    }

    list() {
        this._changeEvent.emit();
    }

    hasFirstPage() {
        return this.pagination.page > 1;

    }

    hasLastPage() {
        return this.pagination.page < this.getTotalPages();

    }

    getTotalPages() {
        if (this.pagination != null && this.pagination.totalElement != null) {
            let total = Math.floor(this.pagination.totalElement / this.pagination.size);
            if (this.pagination.totalElement % this.pagination.size > 0) {
                total++;
            }
            return total;
        }
        return 0;
    }

    getPagesButtons() {
        let paginas: number[] = [];

        let totalPages: number = this.getTotalPages();
        if (this.pagination.page == 0 && totalPages > 0) {
            this.pagination.page = 1;
        }

        let pagina: number = this.pagination.page;

        if (totalPages > 0) {
            let array: number[] = [pagina - 4, pagina - 3, pagina - 2, pagina - 1, pagina, pagina + 1, pagina + 2];
            for (let i = array.length - 1; i >= 0; i--) {
                if (array[i] > 0 && array[i] <= totalPages && paginas.length < 5) {
                    paginas.push(array[i]);
                }
            }

            paginas = paginas.reverse();
            while (paginas.length < 5 && paginas[paginas.length - 1] < totalPages) {
                paginas.push(paginas[paginas.length - 1] + 1);
            }

        } else {
            paginas = [1];
        }
        return paginas;
    }

}
