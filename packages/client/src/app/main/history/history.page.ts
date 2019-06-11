import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../../services/history/history.service';
import { LoadingController } from '@ionic/angular';
import { tap, finalize, flatMap, map } from 'rxjs/operators';
import { HistoryList, HistoryDetail } from '../../api';
import { from } from 'rxjs';
import { state, style, transition, animate, trigger, query, stagger } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-history',
    templateUrl: './history.page.html',
    styleUrls: ['./history.page.scss']
})
export class HistoryPage implements OnInit {

    history: HistoryDetail;

    constructor(
        private loadingController: LoadingController,
        private route: ActivatedRoute,
        private historyService: HistoryService
    ) { }

    ngOnInit() {
        this.getHistory().subscribe()
    }

    getHistory() {
        const histories$ = this.historyService.get(this.route.snapshot.params.id)
            .pipe(
                tap(history => this.history = history)
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
