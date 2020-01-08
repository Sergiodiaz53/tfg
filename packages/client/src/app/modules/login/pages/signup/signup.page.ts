import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IonSlides, LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { UserProfileCreate, UserService } from '../../../../core/api';

@Component({
    selector: 'app-signup',
    templateUrl: 'signup.page.html'
})
export class SignUpPage implements OnInit {
    accessDataFom: FormGroup;
    questionayDataForm: FormGroup;
    moreDataForm: FormGroup;

    registerStep = 1;

    slideOptions = {
        allowTouchMove: false
    };

    @ViewChild(IonSlides, { static: true })
    slides: IonSlides;

    constructor(
        private router: Router,
        private loadingController: LoadingController,
        private userApiService: UserService
    ) {}

    ngOnInit() {}

    nextSlide() {
        this.slides.slideNext().then(() => {
            this.registerStep += 1;
        });
    }

    onSex(sex: UserProfileCreate.SexEnum) {
        console.log(sex);
        this.nextSlide();
    }

    async onSignup() {
        const loading = await this.loadingController.create();
        await loading.present();

        this.userApiService
            .userCreate({
                ...this.accessDataFom.getRawValue(),
                questionary: this.questionayDataForm.getRawValue(),
                profile: this.moreDataForm.getRawValue()
            })
            .pipe(finalize(() => loading.dismiss()))
            .subscribe({
                next: response => {
                    this.router.navigate(['../'], { skipLocationChange: true });
                }
            });
    }
}
