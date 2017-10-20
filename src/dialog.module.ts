import { NgModule } from "@angular/core";
import { MatDialog, MatDialogRef, MatSnackBar, MatSnackBarConfig } from "@angular/material";
import { DialogComponent } from "./dialog.component";

@NgModule({
    exports: [DialogComponent],
    imports: [ MatDialog, MatDialogRef, MatSnackBar, MatSnackBarConfig ],
    declarations: [DialogComponent]
})
export class DialogModule {}