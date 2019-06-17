import { AuthToken } from '../../api';

export class LoginUser {
    static readonly type = '[User] Login User';

    constructor(public payload: Partial<AuthToken> & { token?: string }) {}
}
