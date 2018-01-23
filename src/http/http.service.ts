import { HttpError } from "../error/http-error";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import 'rxjs/add/operator/toPromise';

export interface IRequestOptions {
    body?: any;
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
        [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: any;
    withCredentials?: boolean;
}

export interface IInnotsResponse {
    result?: any;
    error?: string;
    details?: any;
}

export class HttpService {
    protected get currentRequestCount(): number {
        return this._currentRequestCount;
    }

    protected set currentRequestCount(value: number) {
        this._currentRequestCount = value;
        this.requestCount.next(this._currentRequestCount);
    }

    protected _currentRequestCount: number = 0;

    protected _requestCount: BehaviorSubject<number> = new BehaviorSubject(this.currentRequestCount);
    get requestCount(): BehaviorSubject<number> {
        return this._requestCount;
    }

    constructor(public baseUrl: string, protected http: HttpClient) {
    }

    async get<T>(url: string, params?: any): Promise<T> {
        const httpParams: HttpParams = new HttpParams();
        if (params) {
            Object.keys(params).forEach(key => {
                httpParams.set(key, params[key]);
            });
        }
        return await this.request<T>('GET', url, {params: httpParams});
    }

    async post<T>(url: string, body?: any): Promise<T> {
        return await this.request<T>('POST', url, {body});
    }

    async request<T>(method: string, url: string, options: IRequestOptions): Promise<T> {
        this.currentRequestCount++;
        try {
            const res: IInnotsResponse = await this.http.request<T>(method, this.baseUrl + url, options).toPromise();
            return this.extractData(res);
        } catch (err) {
            this.handleError(err);
        } finally {
            this.currentRequestCount--;
        }
    }

    async requestRaw<T>(method: string, url: string, options: IRequestOptions): Promise<Blob> {
        options = Object.assign({}, options, {responseType: 'blob'});
        options.responseType = 'blob';
        this.currentRequestCount++;
        try {
            return await this.http.request<Blob>(method, this.baseUrl + url, options).toPromise();
        } catch (err) {
            this.handleError(err);
        } finally {
            this.currentRequestCount--;
        }
    }

    getRequestCount(): number {
        return this.currentRequestCount;
    }

    protected extractData(response: IInnotsResponse): any {
        return response.result || null;
    }

    protected handleError(response: HttpErrorResponse | Error | any): void {
        if (response.hasOwnProperty('error')) {
            const err = response.error;
            if (err instanceof Error) {
                // A client-side or network error occurred. HttpError will be thrown with default code.
                throw new HttpError();
            }
            if (err.hasOwnProperty('error') && err.error.startsWith('ERROR_')) {
                throw new HttpError(err.error);
            }
            throw new Error(err);
        }

        throw new Error(response);
    }
}