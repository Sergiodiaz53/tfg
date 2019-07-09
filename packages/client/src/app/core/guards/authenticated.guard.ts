import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { UserState } from '../../shared/states/user/user.state';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
    constructor(private router: Router, private store: Store) {}

    canActivate() {
        if (!this.store.selectSnapshot(UserState.token)) {
            this.router.navigate(['login'], { skipLocationChange: true });

            return false;
        }

        return true;
    }
}
