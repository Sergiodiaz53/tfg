import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-valoration',
    templateUrl: 'valoration.component.html',
    styleUrls: ['valoration.component.scss']
})
export class ValorationComponent implements OnInit {
    value: number;

    constructor() {}

    ngOnInit() {}

    onValue(value: CustomEvent) {
        this.value = value.detail.value;
    }
}
