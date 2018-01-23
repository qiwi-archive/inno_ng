import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { DialogService } from "../dialog.service";
import { ErrorMessageService } from "./error-message/error-message.service";
@Injectable()
export class ErrorServiceHandler extends ErrorHandler {
    constructor(protected injector: Injector) {
        super();
    }

    protected get _dialogService(): DialogService {
        return this.injector.get(DialogService);
    }

    protected get _errorMessageService(): ErrorMessageService {
        return this.injector.get(ErrorMessageService);
    }

    handleError(error: any): void {
        let code: string;
        if (error.hasOwnProperty('rejection')) {
            code = error.rejection.code;
        } else {
            code = error.message;
        }
        this._dialogService.showError(this._errorMessageService.getMessage(code));
        super.handleError(error);
    }
}