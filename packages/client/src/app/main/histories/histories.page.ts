import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../../services/history/history.service';
import { LoadingController } from '@ionic/angular';
import { tap, finalize, flatMap, map } from 'rxjs/operators';
import { HistoryList } from '../../api';
import { from } from 'rxjs';
import { state, style, transition, animate, trigger, query, stagger } from '@angular/animations';

@Component({
    selector: 'app-histories',
    templateUrl: './histories.page.html',
    styleUrls: ['./histories.page.scss'],
    animations: [
        trigger('historiesAnimation', [
            transition('* => *', [
                query(':enter', [
                    style({ opacity: 0, transform: 'translateX(-10px)' }),
                    stagger(20, [animate(150)])
                ], { optional: true })
            ])
        ])
    ]
})
export class HistoriesPage implements OnInit {

    histories: HistoryList[] = [];

    constructor(
        private loadingController: LoadingController,
        private historyService: HistoryService
    ) { }

    ngOnInit() {
        this.getHistories().subscribe()
    }

    getHistories() {
        const histories$ = this.historyService.getAll()
            .pipe(
                tap(histories => this.histories = histories)
            );
        
        let loading: HTMLIonLoadingElement;

        return from(this.loadingController.create())
            .pipe(
                flatMap(loadingComponent => {
                    loading = loadingComponent;
                    return loadingComponent.present();
                }),
                flatMap(() => histories$.pipe(map(() => loading))),
                finalize(() => loading.dismiss())
            );
    }
}
