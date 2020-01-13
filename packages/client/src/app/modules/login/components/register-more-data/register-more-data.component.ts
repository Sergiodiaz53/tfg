import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Questionary } from './../../../../core/api/model/questionary';

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
                painFrequency: [{ value: null, disabled: true }],
                peePain: [false],
                sexualRelationsPain: [false],
                painIntensity: [{ value: null, disabled: true }],
                stopDoingThings: [{ value: null, disabled: true }, [Validators.required]],
                thinkSymptoms: [{ value: null, disabled: true }, [Validators.required]],
                sameHealthLife: [{ value: null, disabled: true }, [Validators.required]]
            },
            {
                validators: [
                    this.painFrequencyValidator,
                    this.sexualPainIntensityValidator,
                    this.lastValuesValidator
                ]
            }
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

        const painFrequency = formGroup.get('painFrequency');

        if (anyPainSelected) {
            validate = painFrequency.value !== null ? null : { mismatch: true };
        }

        if (anyPainSelected && painFrequency.disabled) {
            painFrequency.enable({ onlySelf: true });
        } else if (!anyPainSelected && painFrequency.enable) {
            painFrequency.disable({ onlySelf: true });
        }

        return validate;
    }

    private sexualPainIntensityValidator(formGroup: FormGroup) {
        let validate = null;

        const hasPain =
            formGroup.get('sexualRelationsPain').value || formGroup.get('peePain').value;
        const painIntensity = formGroup.get('painIntensity');

        if (hasPain) {
            validate = painIntensity.value > 0 ? null : { mismatch: true };
        }

        if (hasPain && painIntensity.disabled) {
            painIntensity.enable({ onlySelf: true });
        } else if (!hasPain && painIntensity.enabled) {
            painIntensity.disable({ onlySelf: true });
        }

        return validate;
    }

    private lastValuesValidator(formGroup: FormGroup) {
        const painIntensity = formGroup.get('painIntensity');
        const painFrequency = formGroup.get('painFrequency');

        const stopDoingThings = formGroup.get('stopDoingThings');
        const thinkSymptoms = formGroup.get('thinkSymptoms');
        const sameHealthLife = formGroup.get('sameHealthLife');

        const painEnabled = painIntensity.enabled || painFrequency.enabled;

        if (painEnabled && stopDoingThings.disabled) {
            stopDoingThings.enable({ onlySelf: true });
            thinkSymptoms.enable({ onlySelf: true });
            sameHealthLife.enable({ onlySelf: true });
        } else if (!painEnabled && stopDoingThings.enabled) {
            stopDoingThings.disable({ onlySelf: true });
            thinkSymptoms.disable({ onlySelf: true });
            sameHealthLife.disable({ onlySelf: true });
        }

        return null;
    }
}
