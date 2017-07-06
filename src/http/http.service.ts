import {
    Http, Headers, RequestMethod, RequestOptionsArgs, Response, URLSearchParams,
    ResponseContentType
} from "@angular/http";
import {HttpError} from "../error/http-error";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

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
    get requestCount():BehaviorSubject<number> {
        return this._requestCount;
    }

    constructor(public baseUrl: string, protected http: Http) {
    }

    async get<T>(url: string, query?: any): Promise<T> {
        let options: RequestOptionsArgs = {method: RequestMethod.Get};
        if (query) {
            options.search = this.convertToSearchParams(query);
        }
        return await this.request<T>(url, options);
    }

    async post<T>(url: string, body?: any): Promise<T> {
        let options: RequestOptionsArgs = {method: RequestMethod.Post};
        if (body) {
            options.body = body;
        }
        return await this.request<T>(url, options);
    }

    async request<T>(url: string, options: RequestOptionsArgs): Promise<T> {
        if (!options.headers) {
            options.headers = new Headers({
                'Content-Type': 'application/json'
            });
        }

        this.currentRequestCount++;
        try {
            const res: Response = await this.http.request(this.baseUrl + url, options).toPromise();
            return this.extractData(res);
        } catch (err) {
            this.handleError(err);
        } finally {
            this.currentRequestCount--;
        }
    }

    async requestRaw<T>(url: string, options: RequestOptionsArgs): Promise<any> {
        options.responseType = ResponseContentType.Blob;
        this.currentRequestCount++;
        try {
            const res: Response = await this.http.request(this.baseUrl + url, options).toPromise();
            return res.blob();
        } catch (err) {
            this.handleError(err);
        } finally {
            this.currentRequestCount--;
        }
    }

    getRequestCount(): number {
        return this.currentRequestCount;
    }

    protected convertToSearchParams(object: any): URLSearchParams {
        const params: URLSearchParams = new URLSearchParams();
        Object.keys(object).forEach((key) => {
            params.set(key, object[key]);
        });
        return params;
    }

    protected extractData(res: Response): any {
        let body = res.json();
        return body.result || null;
    }

    protected handleError(error: Error | any): void {
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            if (err.startsWith('ERROR_')) {
                throw new HttpError(err, error.status);
            } else {
                throw error;
            }
        }

        throw error;
    }
}