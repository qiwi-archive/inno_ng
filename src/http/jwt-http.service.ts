import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthStorageService } from "../auth-storage.service";
import { HttpService, IRequestOptions } from "./http.service";

export class JwtHttpService extends HttpService {

    constructor(public baseUrl: string, protected http: HttpClient, protected authStorageService: AuthStorageService) {
        super(baseUrl, http);
    }

    async request<T>(method: string, url: string, options: IRequestOptions): Promise<T> {
        this.processOptions(options);
        return super.request<T>(method, url, options);
    }

    async requestRaw<T>(method: string, url: string, options: IRequestOptions): Promise<Blob> {
        this.processOptions(options);
        return super.requestRaw<T>(method, url, options);
    }

    processOptions(options: IRequestOptions): void {
        options.headers = options.headers || {};
        if (this.authStorageService.isAuthenticated()) {
            const bearer = 'Bearer ' + this.authStorageService.getCurrentJwtToken();

            if (options.headers instanceof HttpHeaders) {
                options.headers.set('Authorization', bearer);
            } else {
                options.headers.Authorization = bearer;
            }
        }
    }
}
