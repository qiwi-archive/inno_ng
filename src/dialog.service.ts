import { ComponentType } from "@angular/cdk/portal";
import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef, MatSnackBar, MatSnackBarConfig } from "@angular/material";

@Injectable()
export class DialogService {
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

    protected showSnackBar(message: string, duration: number = DialogService.DEFAULT_DURATION): void {
        const snackBarConfig: MatSnackBarConfig = new MatSnackBarConfig();
        snackBarConfig.duration = duration;
        this.snackBar.open(message, '', snackBarConfig);
    }
}