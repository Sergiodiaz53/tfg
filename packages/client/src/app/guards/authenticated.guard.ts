import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user/user.service';

@Injectable()
export class AuthenticatedGuard implements CanActivate {

    constructor(private router: Router, private userService: UserService) {}

    canActivate() {
        if (!this.userService.user) {
            this.router.navigate(['login']);

            return false;
        }

        return true;
    }
}
