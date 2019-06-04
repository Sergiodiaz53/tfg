import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user/user.service';

@Injectable()
export class AnonymousGuard implements CanActivate {

    constructor(private router: Router, private userService: UserService) {}

    canActivate() {
        if (this.userService.user) {
            this.router.navigate(['']);

            return false;
        }

        return true;
    }
}
