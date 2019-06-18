import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngxs/store';
import { SetValoration } from '../../../states/question/question.actions';

@Component({
    selector: 'app-valoration',
    templateUrl: 'valoration.component.html',
    styleUrls: ['valoration.component.scss']
})
export class ValorationComponent implements OnInit {
    @Output() valoration = new EventEmitter<number>();

    constructor() {}

    ngOnInit() {}

    setValoration(event: MouseEvent) {
        const element = event.target as HTMLElement;
        const value = (event.x - element.offsetLeft) / element.offsetWidth;

        this.valoration.next(value);
    }
}
