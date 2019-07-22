import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../../core/api';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: 'signup.page.html'
})
export class SignUpPage implements OnInit {
    signupParams: FormGroup;
    questionayForm: FormGroup;
    profileForm: FormGroup;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private loadingController: LoadingController,
        private userApiService: UserService
    ) {}

    ngOnInit() {
        this.signupParams = this.fb.group(
            {
                username: [null, [Validators.required]],
                password: [null, [Validators.required]],
                confirmPassword: [null, [Validators.required]]
            },
            { validators: this.passwordValidator }
        );
    }

    async onSignup() {
        const loading = await this.loadingController.create();
        await loading.present();

        this.userApiService
            .userCreate({
                ...this.signupParams.getRawValue(),
                questionary: this.questionayForm.getRawValue(),
                profile: this.profileForm.getRawValue()
            })
            .pipe(finalize(() => loading.dismiss()))
            .subscribe({
                next: response => {
                    this.router.navigate(['../'], { skipLocationChange: true });
                }
            });
    }

    private passwordValidator(formGroup: FormGroup) {
        return formGroup.get('password').value === formGroup.get('confirmPassword').value
            ? null
            : { mismatch: true };
    }
}
