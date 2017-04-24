import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {CookieService} from "angular2-cookie/services/cookies.service";

@Injectable()
export class AuthStorageService {
    public static readonly JWT_KEY: string = 'jwt';

    constructor(protected cookieService: CookieService) {
    }

    saveToken(token: string): void {
        this.cookieService.put(AuthStorageService.JWT_KEY, token);
    }

    clearToken(): void {
        this.cookieService.remove(AuthStorageService.JWT_KEY);
    }

    isAuthenticated(): boolean {
        const jwt = this.cookieService.get(AuthStorageService.JWT_KEY);

        return jwt && jwt.length > 0;
    }

    getCurrentJwtToken(): string {
        return this.cookieService.get(AuthStorageService.JWT_KEY);
    }
}
