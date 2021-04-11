import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Token } from '../shared/model/token';
import * as AuthActions from './auth.actions';
import { HTTP_AUTHORIZATION, LOCALSTORAGE_J2C_AUTHORIZATION } from '../shared/util/constants';
import { AuthenticationService } from '../api/services';
import { AuthRequest } from '../api/models';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

const tokenRefreshOffset: number = 180000;

@Injectable({ providedIn: 'root' })
export class AuthService {

    private tokenExpirationTimer: any; // using 'any' because of inconsistent typeof between browser and NodeJS

    constructor(
        private readonly store: Store,
        private readonly authenticationService: AuthenticationService
    ) { }

    public login(body: AuthRequest): Observable<void> {
        return this.authenticationService.authenticate$Response({ body })
            .pipe(
                tap(this.processTokenResponse),
                map(() => undefined as void)
            );
    }

    public logout(): void {
        this.clearTokenRefreshTimer();
        localStorage.removeItem(LOCALSTORAGE_J2C_AUTHORIZATION);
        this.store.dispatch(new AuthActions.SetToken(Token.anonymous()));
    }

    public autoLogin(): void {
        const authorization = localStorage.getItem(LOCALSTORAGE_J2C_AUTHORIZATION);

        if (!authorization) {
            return;
        }

        const optional = Token.decode(authorization);

        if (optional.isPresent()) {
            const token = optional.get();
            if (token.isValid()) {
                this.setTokenRefreshTimer(token.exp);
                this.store.dispatch(new AuthActions.SetToken(token));
                return;
            }
        }
        localStorage.removeItem(LOCALSTORAGE_J2C_AUTHORIZATION);
    }

    private setTokenRefreshTimer(date: Date): void {
        this.clearTokenRefreshTimer();
        const duration = date.getTime() - Date.now() - tokenRefreshOffset;
        this.tokenExpirationTimer = setTimeout(
            () => {
                this.authenticationService.refresh$Response().subscribe(
                    this.processTokenResponse,
                    error => console.error(error)
                );
            },
            Math.max(duration, 0)
        );
    }

    private clearTokenRefreshTimer(): void {
        if (!!this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
            this.tokenExpirationTimer = null;
        }
    }

    private processTokenResponse(response: HttpResponse<void>): void {
        const authorization = response.headers.get(HTTP_AUTHORIZATION);

        if (!authorization) {
            console.error(
                'Expected ' + HTTP_AUTHORIZATION 
                    + ' header from server but none was supplied'
            );
            return;
        }

        const optional = Token.decode(authorization);

        optional.ifPresentOrElse(
            token => {
                this.setTokenRefreshTimer(token.exp);
                localStorage.setItem(LOCALSTORAGE_J2C_AUTHORIZATION, JSON.stringify(token.encoded));
                this.store.dispatch(new AuthActions.SetToken(token));
            },
            () => console.error('Server supplied unexpected token format')
        );
    }

}
