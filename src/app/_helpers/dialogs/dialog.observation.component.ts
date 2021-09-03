import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {BaseClass} from "../base-class";

//***************************************
//DIALOGS
@Component({
    selector: 'dialog-observacao-confirm',
    template: `
        <h2 mat-dialog-title>{{object.title}}</h2>

        <mat-dialog-content>

            <label class="message-text">{{object.message}}</label>

            <mat-form-field appearance="outline" floatLabel="always" class="col-md-12">
                <mat-label>Observação</mat-label>
                <textarea matInput name="observacao" [(ngModel)]="object.observacao" autocomplete="off"></textarea>
            </mat-form-field>

            <div class="group-button col-md-12">
                <button mat-raised-button color="primary" (click)="ok()">Sim</button>
                <button mat-raised-button color="secondary" (click)="cancel()">Não</button>
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
export class DialogObservationComponent extends BaseClass implements OnInit {
    object: any;

    constructor(public dialogRef: MatDialogRef<DialogObservationComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private snackBar: MatSnackBar) {
        super();
        this.object = data;
    }

    ngOnInit() {
    }

    ok(): void {
        if (this.object.requiredObs && !this.object.observacao) {
            this.showError(this.snackBar, "Informe uma observação!");
            return;
        }
        this.dialogRef.close(this.object);
    }

    cancel(): void {
        this.dialogRef.close();
    }
}
