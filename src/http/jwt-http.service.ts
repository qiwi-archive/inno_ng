import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthStorageService } from "../auth-storage.service";
import { HttpService, IRequestOptions } from "./http.service";

export class JwtHttpService extends HttpService {

    constructor(public baseUrl: string, protected http: HttpClient, protected authStorageService: AuthStorageService) {
        super(baseUrl, http);
    }

    async request<T>(method: string, url: string, options: IRequestOptions): Promise<T> {
        options = this.processOptions(options);
        return super.request<T>(method, url, options);
    }

    async requestRaw<T>(method: string, url: string, options: IRequestOptions): Promise<Blob> {
        options = this.processOptions(options);
        return super.requestRaw<T>(method, url, options);
    }

    processOptions(options: IRequestOptions): void {
        options.headers = options.headers || new HttpHeaders();
        if (this.authStorageService.isAuthenticated()) {
            options.headers['Authorization'] = 'Bearer ' + this.authStorageService.getCurrentJwtToken();
        }
    }
}