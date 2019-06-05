import { Injectable } from '@angular/core';
import { HistoryService as HistoryApiService, HistoryLineService } from '../../api';

@Injectable({ providedIn: 'root' })
export class HistoryService {
    constructor(
        private historyApiService: HistoryApiService,
        private historyLineApiService: HistoryLineService
    ) {}

    create() {
        return this.historyApiService.historyCreate();
    }

    get(id: number) {
        return this.historyApiService.historyRead(`${id}`)
    }
}