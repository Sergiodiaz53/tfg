import { Injectable } from '@angular/core';
import { tap, flatMap, share, take, catchError, map } from 'rxjs/operators';

import { UserService as UserApiService, UserDetail, AccessTokenService } from '../../modules/api';
import { of, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    user: UserDetail;

    constructor(private accessTokenApiService: AccessTokenService, private userApiService: UserApiService) { }

    login(credentials: { username: string, password: string }) {
        const observable = this.accessTokenApiService.accessToken(credentials)
            .pipe(
                tap(response => {
                    this.accessTokenApiService.configuration.apiKeys = { Authorization: `Token ${response.token}` };
                }),
                flatMap(() => this.userApiService.user()),
                tap(response => this.user = response),
                share()
            );           
        
        observable.subscribe();

        return observable;
    }
}