import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {HttpError} from "./http-error";

/**
 * Глобальный информер о разных типах ошибок, на который можно подписываться
 */
@Injectable()
export class ErrorInformer {
    public httpErrors: Subject<HttpError>;

    constructor() {
        this.httpErrors = new Subject();
    }
}