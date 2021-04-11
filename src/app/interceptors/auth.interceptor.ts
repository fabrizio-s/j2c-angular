import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthState } from '../auth/auth.state';
import { HTTP_AUTHORIZATION } from '../shared/util/constants';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private store: Store) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.store.selectSnapshot(AuthState.token);
        if (!token || !token.isValid()) { // TODO: possible to rewrite condition as '!token?.isValid()' ?
            return next.handle(request);
        }
        const authorizedRequest = request.clone({
            headers: request.headers
                .append(HTTP_AUTHORIZATION, token.encoded)
        });
        return next.handle(authorizedRequest);
    }

}
