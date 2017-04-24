import {NgModule} from "@angular/core";
import {DialogComponent} from "./dialog.component";
import {MaterialModule} from '@angular/material';

@NgModule({
    exports: [DialogComponent],
    imports: [MaterialModule],
    declarations: [DialogComponent]
})
export class DialogModule {}