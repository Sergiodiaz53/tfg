import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { LoadingController } from '@ionic/angular';

import { UserDetail } from '../modules/api';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  credentialErrorsShown = false;

  loginCredentials = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  })

  constructor(private loadingController: LoadingController, private userService: UserService) {}

  async onLogin() {
    this.credentialErrorsShown = false;

    const loading = await this.loadingController.create();
    await loading.present();

    this.userService.login(
      this.loginCredentials.value
    ).subscribe(response => {
        if (response.data) {
          console.log('loggedId');
        } else {
          this.credentialErrorsShown = true;
        }

        loading.dismiss();
      });
  }
}
