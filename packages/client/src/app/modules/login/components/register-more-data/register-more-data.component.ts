import { Questionary } from './../../../../core/api/model/questionary';
import { UserProfileCreate } from './../../../../core/api/model/userProfileCreate';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'tfg-register-more-data',
    templateUrl: './register-more-data.component.html',
    styleUrls: ['./register-more-data.component.scss']
})
export class RegisterMoreDataComponent implements OnInit {
    Frequency = Questionary.PainFrequencyEnum;
    SameHealthLife = Questionary.SameHealthLifeEnum;
    StopDoingThings = Questionary.StopDoingThingsEnum;
    ThinkSymptoms = Questionary.ThinkSymptomsEnum;

    constructor() {}

    ngOnInit() {}
}
