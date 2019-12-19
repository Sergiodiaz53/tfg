import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'tfg-register-access-data',
    templateUrl: './register-access-data.component.html',
    styleUrls: ['./register-access-data.component.scss']
})
export class RegisterAccessDataComponent implements OnInit {
    @Input() accessDataForm: FormGroup;

    @Output() accessDataFormChange = new EventEmitter<FormGroup>();

    @Output() continue = new EventEmitter<void>();

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.accessDataForm = this.fb.group(
            {
                username: [null, [Validators.required]],
                password: [null, [Validators.required]],
                confirmPassword: [null, [Validators.required]],
                email: [null, [Validators.required]],
                professionalCode: [null]
            },
            { validators: this.passwordValidator }
        );

        this.accessDataFormChange.emit(this.accessDataForm);
    }

    private passwordValidator(formGroup: FormGroup) {
        return formGroup.get('password').value === formGroup.get('confirmPassword').value
            ? null
            : { mismatch: true };
    }
}
