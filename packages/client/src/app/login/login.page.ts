import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { LoadingController } from '@ionic/angular';

import { UserService } from '../services/user/user.service';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { LoginUser } from '../states/user/user.actions';
import { UserDetail } from '../api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {

  credentialErrorsShown = false;

  loginCredentials = new FormGroup({
    username: new FormControl('sifaw'),
    password: new FormControl('49preerhe')
  })

  constructor(
    private router: Router,
    private loadingController: LoadingController,
    private store: Store
  ) {}

  async onLogin() {
    this.credentialErrorsShown = false;

    const loading = await this.loadingController.create();
    await loading.present();

    this.store.dispatch(new LoginUser(this.loginCredentials.value))
      .pipe(
        finalize(() => loading.dismiss())
      )
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
