import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';

import { HistoryService } from '../services/history/history.service';

@Component({
  selector: 'app-main',
  templateUrl: 'main.page.html',
  styleUrls: ['main.page.scss'],
})
export class MainPage {
  constructor(
    private router: Router,
    private loadingController: LoadingController,
    private historyService: HistoryService
  ) {}

  async start() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.historyService.create()
      .pipe(
        finalize(() => loading.dismiss())
      )
      .subscribe(history => {
        this.router.navigate(['questions', history.id])
      })
  }
}
