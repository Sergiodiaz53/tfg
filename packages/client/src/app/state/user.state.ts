import { flatMap, tap } from 'rxjs/operators';

import { State, Action, StateContext } from '@ngxs/store';

import { AccessTokenService, UserService, UserDetail } from '../modules/api';

import { LoginUser } from './user.actions';

@State<UserDetail>({
    name: 'user'
})
export class UserState {
    constructor(private accessTokenService: AccessTokenService, private userService: UserService) {}

    @Action(LoginUser)
    loginUser(ctx: StateContext<UserDetail>, data: LoginUser) {
        return this.accessTokenService.accessToken(data.payload).
            pipe(
                tap(accessToken => {
                    this.accessTokenService.configuration.apiKeys = { Authorization: `Token ${accessToken.token}` };
                }),
                flatMap(accessToken => this.userService.user()),
                tap(user => {
                    ctx.patchState(user);
                })
            )
    }
}