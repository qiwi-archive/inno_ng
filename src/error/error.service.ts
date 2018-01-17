import {ErrorHandler, Injectable} from "@angular/core";
import {ErrorInformer} from "./error-informer.service";
import {HttpError} from "./http-error";
import {Response} from "@angular/http";
@Injectable()
export class ErrorServiceHandler extends ErrorHandler {
    constructor(public informer: ErrorInformer) {
        super();
    }

    handleError(error: any): void {
        if (error.rejection) {
            if (error.rejection.type === HttpError.type) {
                this.informer.httpErrors.next(error.rejection);
                return;
            } else if (error.rejection instanceof Response) {
                this.informer.httpErrors.next(new HttpError('ERROR_CONNECT', 500));
                return;
            }
        }
        super.handleError(error);
    }
}