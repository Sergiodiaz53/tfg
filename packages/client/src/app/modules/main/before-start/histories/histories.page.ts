import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { finalize, flatMap, map } from 'rxjs/operators';
import { HistoryList, HistoryStats } from '../../../../core/api';
import { from, merge, Observable } from 'rxjs';
import { style, transition, animate, trigger, query, stagger } from '@angular/animations';
import { Store, Select } from '@ngxs/store';
import { GetHistories, GetStats } from '../../../../shared/states/histories/histories.actions';

@Component({
    selector: 'app-histories',
    templateUrl: './histories.page.html',
    styleUrls: ['./histories.page.scss'],
    animations: [
        trigger('historiesAnimation', [
            transition('* => *', [
                query(
                    ':enter',
                    [
                        style({ opacity: 0, transform: 'translateX(-10px)' }),
                        stagger(20, [animate(150)])
                    ],
                    { optional: true }
                )
            ])
        ])
    ]
})
export class HistoriesPage implements OnInit {
    @Select(state => state.histories.histories)
    histories$: Observable<HistoryList[]>;

    @Select(state => state.histories.stats)
    stats$: Observable<HistoryStats[]>;

    constructor(private loadingController: LoadingController, private store: Store) {}

    ngOnInit() {
        this.getHistoryAndStats().subscribe();
    }

    getHistoryAndStats() {
        let loading: HTMLIonLoadingElement;

        return from(this.loadingController.create()).pipe(
            flatMap(loadingComponent => {
                loading = loadingComponent;
                return loadingComponent.present();
            }),
            flatMap(() => {
                return merge(
                    this.store.dispatch(new GetHistories()),
                    this.store.dispatch(new GetStats())
                ).pipe(map(() => loading));
            }),
            finalize(() => loading.dismiss())
        );
    }
}
