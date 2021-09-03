import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

//***************************************
//DIALOGS
@Component({
    selector: 'dialog-confirm',
    template: `
        <h2 mat-dialog-title>{{object.title}}</h2>

        <mat-dialog-content>

            <label class="message-text" *ngIf="!htmlContent">{{object.message}}</label>
            <label class="message-text" *ngIf="htmlContent" [innerHtml]="htmlContent"></label>

            <div class="group-button col-md-12">
                <button mat-raised-button color="primary" (click)="close(true)">Sim</button>
                <button mat-raised-button color="secondary" (click)="close(false)">Não</button>
            </div>
        </mat-dialog-content>
    `,
    styles: [`
        h2, mat-dialog-content {
            text-align: center;
        }

        label.title {
            font-weight: bold;
        }

        .group-button {
            margin-top: 10px;
            margin-bottom: 10px;
        }
    `]
})
export class DialogConfirmComponent implements OnInit {
    object: any;
    htmlContent?: string;

    constructor(public dialogRef: MatDialogRef<DialogConfirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
        this.object = data;
    }

    ngOnInit() {
    }

    close(excluir: boolean = false): void {
        this.dialogRef.close(excluir);
    }
}
