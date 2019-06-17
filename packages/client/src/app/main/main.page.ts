import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { finalize, tap } from 'rxjs/operators';

import { HistoryService } from '../services/history/history.service';
import { Store } from '@ngxs/store';
import { GetQuestion } from '../states/question/question.actions';

@Component({
    selector: 'app-main',
    templateUrl: 'main.page.html',
    styleUrls: ['main.page.scss']
})
export class MainPage {
    constructor(
        private router: Router,
        private loadingController: LoadingController,
        private store: Store
    ) {}

    async start() {
        this.router.navigate(['questions']);
    }
}
