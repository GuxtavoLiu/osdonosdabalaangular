import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

//***************************************
//DIALOGS
@Component({
    selector: 'dialog-excluir',
    template: `
        <h2 mat-dialog-title>{{object.title ? object.title : 'Excluir'}}</h2>

        <mat-dialog-content>

            <label class="message-text">{{object.message}}</label>

            <div class="group-button col-md-12">
                <button mat-raised-button color="warn" (click)="close(true)">Sim</button>
                <button mat-raised-button color="primary" (click)="close(false)">Não</button>
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
export class DialogDeleteComponent implements OnInit {
    object: any;

    constructor(public dialogRef: MatDialogRef<DialogDeleteComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
        this.object = data;
    }

    ngOnInit() {
    }

    close(excluir: boolean = false): void {
        this.dialogRef.close(excluir);
    }
}
