import { ComponentType } from "@angular/cdk/portal";
import { Component } from "@angular/core";
import { MatDialog, MatDialogRef, MatSnackBar, MatSnackBarConfig } from "@angular/material";

// TODO move to separate common lib?
@Component({
    selector: 'default-component',
    template: ``
})
export class DialogComponent {
    public static readonly DEFAULT_DURATION: number = 4000;

    constructor(public dialog: MatDialog,
                protected snackBar: MatSnackBar) {
    }

    showDialog(component: ComponentType<any>): MatDialogRef<any> {
        return this.dialog.open(component);
    }

    showWarning(message: string): void {
        this.showSnackBar('Внимание! ' + message);
    }

    showSuccess(message: string): void {
        this.showSnackBar(message);
    }

    showError(message?: string): void {
        const snackBarMesssage: string = message ?
            'Произошла ошибка: ' + message :
            'При выполнении запроса произошла ошибка';
        this.showSnackBar(snackBarMesssage);
    }

    protected showSnackBar(message: string, duration: number = DialogComponent.DEFAULT_DURATION): void {
        const snackBarConfig: MatSnackBarConfig = new MatSnackBarConfig();
        snackBarConfig.duration = duration;
        this.snackBar.open(message, '', snackBarConfig);
    }
}