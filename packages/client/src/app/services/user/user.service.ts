import { Injectable } from '@angular/core';
import { of, EMPTY } from 'rxjs';
import { tap, flatMap, share } from 'rxjs/operators';

import { UserService as UserApiService, UserDetail, AccessTokenService } from '../../api';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    user: UserDetail;

    constructor(
        private localStorage: LocalStorageService,
        private accessTokenApiService: AccessTokenService,
        private userApiService: UserApiService
    ) { }

    login(credentials: { username: string, password: string }) {
        const observable = this.accessTokenApiService.accessToken(credentials)
            .pipe(
                tap(response => {
                    this.setAccessToken(response.token);
                    this.localStorage.store('token', response.token);
                }),
                flatMap(() => this.loadUser()),
                share()
            );           
        
        observable.subscribe();

        return observable;
    }

    autologin() {
        const token: string = this.localStorage.retrieve('token');

        return (token ? of(token) : EMPTY)
            .pipe(
                flatMap(() => {
                    this.setAccessToken(token);
                    return this.loadUser();
                })
            );
    }

    setAccessToken(token: string) {
        this.accessTokenApiService.configuration.apiKeys = { Authorization: `Token ${token}` };
    }

    private loadUser() {
        return this.userApiService.user()
            .pipe(
                tap(response => this.user = response)
            )
    }
}