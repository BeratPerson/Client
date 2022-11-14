import { Injectable } from "@angular/core";
import {
    HttpInterceptor, HttpHandler, HttpRequest,
} from '@angular/common/http';
import { UserService } from "./services/user.service";
import { from, mergeMap } from "rxjs";

@Injectable()
export class AuthorizeInterceptor implements HttpInterceptor {

    constructor(private userService: UserService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler) {
        request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        let token: string | null = localStorage.getItem("accessToken");

        //can be used if the expiry date is correct
        if (false) {
            return from(this.userService.refreshingTokens(token)).pipe(
                mergeMap((response) => {
                    request = this.AddAuthorizeHeader(request, response.token)
                    return next.handle(request);
                })
            );
        }
        //************* */

        request = this.AddAuthorizeHeader(request, token)
        return next.handle(request);
    }
    private AddAuthorizeHeader(request: HttpRequest<any>, token: string | null) {
        if (token && this.IsRequiredAuth(request)) {
            return request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
        }
        return request;
    }

    private IsRequiredAuth(request: HttpRequest<any>): boolean {
        if (request.url.startsWith("/api/Auth/Login") || request.url.startsWith("/api/User")) {
            return false;
        }

        return true;
    }
}