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
            sex: [null, [Validators.required]],
            years: [null, [Validators.required, Validators.min(0)]],
            weight: [null, [Validators.required, Validators.min(0)]],
            height: [null, [Validators.required, Validators.min(0)]]
        });

        this.formChange.emit(this.form);
    }
}
