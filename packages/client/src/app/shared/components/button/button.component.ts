import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'tfg-button',
    templateUrl: 'button.component.html',
    styleUrls: ['button.component.scss']
})
export class ButtonComponent implements OnInit {
    @Input() expand: boolean;
    @Input() type: boolean;
    @Input() disabled: boolean;

    constructor() {}

    ngOnInit() {}
}
