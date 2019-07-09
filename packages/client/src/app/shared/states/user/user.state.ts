import { State, Action, StateContext, Selector } from '@ngxs/store';
import { UserDetail, AccessTokenService, UserService } from '../../../core/api';
import { LoginUser } from './user.actions';
import { tap, flatMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

export interface UserModel extends UserDetail {
    token: string;
}

@State<Partial<UserModel>>({
    name: 'user',
    defaults: { token: null }
})
export class UserState {
    @Selector()
    static token(state: UserModel) {
        return state.token;
    }

    constructor(private accessTokenService: AccessTokenService, private userService: UserService) {}

    @Action(LoginUser)
    loginUser(ctx: StateContext<UserModel>, { payload }: LoginUser) {
        const login$ = !payload.token
            ? this.getAccessToken(payload.username, payload.password)
            : of({ token: payload.token });

        return login$.pipe(
            flatMap(result => {
                this.setAccessToken(result.token);
                return this.login(result.token);
            }),
            tap(result => ctx.setState(result))
        );
    }

    private login(token: string) {
        return this.userService.user().pipe(map(user => ({ ...user, ...{ token } })));
    }

    private getAccessToken(username: string, password: string) {
        return this.accessTokenService.accessToken({ username, password });
    }

    private setAccessToken(token: string) {
        this.accessTokenService.configuration.apiKeys = { Authorization: `Token ${token}` };
    }
}
