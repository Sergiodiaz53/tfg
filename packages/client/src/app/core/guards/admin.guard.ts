import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticatedGuard } from './authenticated.guard';
import { UserState } from '../../shared/states/user/user.state';

@Injectable()
export class AdminGuard extends AuthenticatedGuard implements CanActivate {
    canActivate() {
        const user = this.store.selectSnapshot(UserState.data);
        return super.canActivate() && user.isStaff && user.isSuperuser;
    }
}
