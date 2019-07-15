import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LoginPage } from './pages/login/login.page';
import { SignUpPage } from './pages/signup/signup.page';
import { QuestionaryComponent } from './pages/components/questionary/questionary.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: LoginPage
            },
            {
                path: 'signup',
                component: SignUpPage
            }
        ])
    ],
    declarations: [LoginPage, SignUpPage, QuestionaryComponent]
})
export class LoginPageModule {}
