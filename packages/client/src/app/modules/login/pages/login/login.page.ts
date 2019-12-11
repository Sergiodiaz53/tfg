import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';
import { Store } from '@ngxs/store';

import { LoginUser } from '../../../../shared/states/user/user.actions';

@Component({
    selector: 'app-login',
    templateUrl: 'login.page.html',
    styleUrls: ['login.page.scss']
})
export class LoginPage implements OnInit {
    credentialErrorsShown = false;

    loginCredentials: FormGroup;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private loadingController: LoadingController,
        private store: Store
    ) {}

    ngOnInit() {
        this.loginCredentials = this.fb.group({
            username: [''],
            password: ['']
        });
    }

    async onLogin() {
        console.log(this.loginCredentials);
        this.credentialErrorsShown = false;

        const loading = await this.loadingController.create();
        await loading.present();

        this.store
            .dispatch(new LoginUser(this.loginCredentials.value))
            .pipe(finalize(() => loading.dismiss()))
            .subscribe({
                next: response => {
                    this.router.navigate([''], { skipLocationChange: true });
                },
                error: error => {
                    this.credentialErrorsShown = true;
                }
            });
    }
}
