import { AuthToken } from '../modules/api';

export class LoginUser {
    static readonly type = '[User API] Login User';
    constructor(public payload: AuthToken) {}
}