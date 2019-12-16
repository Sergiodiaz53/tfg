import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'tfg-register-access-data',
    templateUrl: './register-access-data.component.html',
    styleUrls: ['./register-access-data.component.scss']
})
export class RegisterAccessDataComponent implements OnInit {
    @Output() continue = new EventEmitter<void>();

    constructor() {}

    ngOnInit() {}
}
