import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { finalize, flatMap, map } from 'rxjs/operators';
import { from } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { GetHistory } from '../../../../shared/states/histories/histories.actions';
import { HistoryDetail } from '../../../../core/api';

@Component({
    selector: 'app-history',
    templateUrl: './history.page.html',
    styleUrls: ['./history.page.scss']
})
export class HistoryPage implements OnInit {
    @Select(state => state.histories.current)
    history$: HistoryDetail;

    constructor(
        private route: ActivatedRoute,
        private loadingController: LoadingController,
        private store: Store
    ) {}

    ngOnInit() {
        this.getHistory().subscribe();
    }

    getHistory() {
        const historyId = this.route.snapshot.params.id;
        let loading: HTMLIonLoadingElement;

        return from(this.loadingController.create()).pipe(
            flatMap(loadingComponent => {
                loading = loadingComponent;
                return loadingComponent.present();
            }),
            flatMap(() => {
                return this.store.dispatch(new GetHistory(historyId)).pipe(map(() => loading));
            }),
            finalize(() => loading.dismiss())
        );
    }
}
