import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { LoadingController } from '@ionic/angular';

import { UserService } from '../services/user/user.service';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

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

  constructor(private router: Router, private loadingController: LoadingController, private userService: UserService) {}

  async onLogin() {
    this.credentialErrorsShown = false;

    const loading = await this.loadingController.create();
    await loading.present();

    this.userService.login(this.loginCredentials.value)
      .pipe(
        finalize(() => loading.dismiss())
      )
      .subscribe({
        next: response => {
          this.router.navigate(['']);
        },
        error: error => {
          this.credentialErrorsShown = true;
        }
      });
  }
}
