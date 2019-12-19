import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LoginPage } from './pages/login/login.page';
import { SignUpPage } from './pages/signup/signup.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';
import { RegisterAccessDataComponent } from './components/register-access-data/register-access-data.component';
import { RegisterSexDataComponent } from './components/register-sex-data/register-sex-data.component';
import { InfoComponent } from './components/info/info.component';
import { RegisterMoreDataComponent } from './components/register-more-data/register-more-data.component';

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
        ]),
        TranslateModule.forChild(),
        SharedComponentsModule
    ],
    declarations: [
        LoginPage,
        SignUpPage,
        RegisterAccessDataComponent,
        RegisterSexDataComponent,
        RegisterMoreDataComponent,
        InfoComponent
    ]
})
export class LoginPageModule {}
