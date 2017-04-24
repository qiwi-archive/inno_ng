import {ErrorHandler, Injectable} from "@angular/core";
import {ErrorInformer} from "./error-informer.service";
import {HttpError} from "./http-error";
import {Response} from "@angular/http";
@Injectable()
export class ErrorServiceHandler extends ErrorHandler {
    constructor(public informer: ErrorInformer) {
        super(true);
    }

    handleError(error: any): void {
        if (error.rejection instanceof HttpError) {
            this.informer.httpErrors.next(error.rejection);
        } else if (error.rejection instanceof Response) {
            this.informer.httpErrors.next(new HttpError('ERROR_CONNECT', 500));
        } else {
            super.handleError(error);
        }
    }
}