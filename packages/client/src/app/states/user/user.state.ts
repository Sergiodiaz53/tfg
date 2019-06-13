import { State, Action, StateContext, Selector } from '@ngxs/store';
import { UserDetail, AccessTokenService, UserService } from '../../api';
import { LoginUser } from './user.actions';
import { tap, flatMap } from 'rxjs/operators';

@State<UserDetail>({
    name: 'user',
    defaults: null
})
export class UserState {
    constructor(
        private accessTokenService: AccessTokenService,
        private userService: UserService
    ) {}

    @Action(LoginUser)
    loginUser(ctx: StateContext<UserDetail>, { payload }: LoginUser) {
        return this.accessTokenService.accessToken(payload)
            .pipe(
                flatMap(result => {
                    this.setAccessToken(result.token);
                    return this.userService.user();
                }),
                tap(result => ctx.setState(result))
            )
    }

    private setAccessToken(token: string) {
        this.accessTokenService.configuration.apiKeys = { Authorization: `Token ${token}` };
    }
}