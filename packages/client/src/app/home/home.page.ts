import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { LoginUser } from '../state/user.actions';
import { UserState } from '../state/user.state';
import { UserDetail } from '../modules/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  loginCredentials = {
    username: 'sifaw',
    password: '49preerhe'
  };

  @Select(UserState) user: Observable<UserDetail>;

  constructor(private store: Store) {}

  onLogin(loginCredentials: { username: '', password: '' }) {
    this.store.dispatch(new LoginUser(loginCredentials));
  }
}
