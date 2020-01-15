import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { SetValoration } from '../../../../shared/states/question/question.actions';

@Component({
    selector: 'app-valoration-page',
    templateUrl: 'valoration.page.html',
    styleUrls: ['valoration.page.scss']
})
export class ValorationPage implements OnInit {
    constructor(private store: Store) {}

    ngOnInit() {}

    onValoration(valoration: number) {
        this.store.dispatch(new SetValoration(valoration)).subscribe();
    }
}
