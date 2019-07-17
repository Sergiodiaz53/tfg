import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Questionary } from '../../../../core/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-questionary',
    templateUrl: 'questionary.component.html'
})
export class QuestionaryComponent implements OnInit {
    PainFrequencyEnum = Questionary.PainFrequencyEnum;
    StopDoingThingsEnum = Questionary.StopDoingThingsEnum;
    ThinkSymptomsEnum = Questionary.ThinkSymptomsEnum;
    SameHealthLifeEnum = Questionary.SameHealthLifeEnum;

    @Input()
    form: FormGroup;

    @Output()
    formChange = new EventEmitter<FormGroup>();

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.form = this.fb.group(
            {
                perinealAreaPain: [false],
                vulvaPain: [false],
                clitorisPain: [false],
                bladderPain: [false],
                painFrequency: [null],
                peePain: [false],
                sexualRelationsPain: [false],
                painIntensity: [null],
                stopDoingThings: [Questionary.StopDoingThingsEnum.ALittle, [Validators.required]],
                thinkSymptoms: [Questionary.ThinkSymptomsEnum.Some, [Validators.required]],
                sameHealthLife: [Questionary.SameHealthLifeEnum.Fatal, [Validators.required]]
            },
            { validators: [this.painFrequencyValidator, this.sexualPainIntensityValidator] }
        );

        this.formChange.emit(this.form);
    }

    private painFrequencyValidator(formGroup: FormGroup) {
        let validate = null;

        const anyPainSelected =
            formGroup.get('perinealAreaPain').value ||
            formGroup.get('vulvaPain').value ||
            formGroup.get('clitorisPain').value ||
            formGroup.get('bladderPain').value;

        if (anyPainSelected) {
            validate = formGroup.get('painFrequency').value !== null ? null : { mismatch: true };
        }

        return validate;
    }

    private sexualPainIntensityValidator(formGroup: FormGroup) {
        let validate = null;

        if (formGroup.get('sexualRelationsPain').value) {
            validate = formGroup.get('painIntensity').value > 0 ? null : { mismatch: true };
        }

        return validate;
    }
}
