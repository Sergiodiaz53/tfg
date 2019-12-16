import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserProfileCreate } from '../../../../core/api';

@Component({
    selector: 'tfg-register-sex-data',
    templateUrl: './register-sex-data.component.html',
    styleUrls: ['./register-sex-data.component.scss']
})
export class RegisterSexDataComponent implements OnInit {
    @Output() sex = new EventEmitter<UserProfileCreate.SexEnum>();

    Sex = UserProfileCreate.SexEnum;

    constructor() {}

    ngOnInit() {}
}
