import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserProfileCreate } from '../../../../core/api';

@Component({
    selector: 'app-profile',
    templateUrl: 'profile.component.html'
})
export class ProfileComponent implements OnInit {
    SexEnum = UserProfileCreate.SexEnum;

    @Input()
    form: FormGroup;

    @Output()
    formChange = new EventEmitter<FormGroup>();

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.form = this.fb.group({
            sex: [UserProfileCreate.SexEnum.Male, [Validators.required]],
            years: [23, [Validators.required, Validators.min(0)]],
            weight: [63, [Validators.required, Validators.min(0)]],
            height: [177, [Validators.required, Validators.min(0)]]
        });

        this.formChange.emit(this.form);
    }
}
