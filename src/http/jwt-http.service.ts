import {Http, Headers, RequestOptionsArgs} from "@angular/http";
import {AuthStorageService} from "../auth-storage.service";
import {HttpService} from "./http.service";

export class JwtHttpService extends HttpService {
    protected currentRequestCount: number = 0;

    constructor(public baseUrl: string, protected http: Http, protected authStorageService: AuthStorageService) {
        super(baseUrl, http);
    }

    async request<T>(url: string, options: RequestOptionsArgs): Promise<T> {
        this.processOptions(options);
        return super.request<T>(url, options);
    }

    async requestRaw(url: string, options: RequestOptionsArgs): Promise<Blob> {
        this.processOptions(options);
        return super.requestRaw(url, options);
    }

    protected processOptions(options: RequestOptionsArgs): void {
        options.headers = options.headers || new Headers();
        if (this.authStorageService.isAuthenticated()) {
            options.headers.set(
                'Authorization', 'Bearer ' + this.authStorageService.getCurrentJwtToken()
            );
        }
    }
}