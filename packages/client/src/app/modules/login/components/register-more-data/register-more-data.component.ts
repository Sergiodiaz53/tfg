import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Questionary } from './../../../../core/api/model/questionary';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'tfg-register-more-data',
    templateUrl: './register-more-data.component.html',
    styleUrls: ['./register-more-data.component.scss']
})
export class RegisterMoreDataComponent implements OnInit {
    @Input() moreDataForm: FormGroup;
    @Input() questironaryForm: FormGroup;

    @Output() moreDataFormChange = new EventEmitter<FormGroup>();
    @Output() questironaryFormChange = new EventEmitter<FormGroup>();
    @Output() continue = new EventEmitter<void>();

    questionaryModel = Questionary;

    Frequency = Questionary.PainFrequencyEnum;
    SameHealthLife = Questionary.SameHealthLifeEnum;
    StopDoingThings = Questionary.StopDoingThingsEnum;
    ThinkSymptoms = Questionary.ThinkSymptomsEnum;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.moreDataForm = this.fb.group({
            birthday: [null, [Validators.required, Validators.min(0)]],
            height: [null, [Validators.required, Validators.min(0)]],
            weight: [null, [Validators.required, Validators.min(0)]]
        });
        this.questironaryForm = this.fb.group(
            {
                perinealAreaPain: [false],
                vulvaPain: [false],
                clitorisPain: [false],
                bladderPain: [false],
                painFrequency: [null],
                peePain: [false],
                sexualRelationsPain: [false],
                painIntensity: [null],
                stopDoingThings: [null, [Validators.required]],
                thinkSymptoms: [null, [Validators.required]],
                sameHealthLife: [null, [Validators.required]]
            },
            { validators: [this.painFrequencyValidator, this.sexualPainIntensityValidator] }
        );

        this.moreDataFormChange.emit(this.moreDataForm);
        this.questironaryFormChange.emit(this.questironaryForm);
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
