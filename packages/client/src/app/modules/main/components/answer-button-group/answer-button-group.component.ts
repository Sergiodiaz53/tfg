import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'tfg-answer-button-group',
    templateUrl: 'answer-button-group.component.html',
    styleUrls: ['answer-button-group.component.scss']
})
export class AnswerButtonGroupComponent implements OnInit {
    @Output() left = new EventEmitter<void>();
    @Output() right = new EventEmitter<void>();

    constructor() {}

    ngOnInit() {}
}
