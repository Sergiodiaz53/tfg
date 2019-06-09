import { Injectable } from '@angular/core';
import { HistoryService as HistoryApiService, HistoryLineService, HistoryLineAnswer } from '../../api';

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

    nextQuestion(id: number) {
        return this.historyApiService.historyNext(`${id}`);
    }

    sendAnswer(id: number, data: HistoryLineAnswer) {
        return this.historyLineApiService.historyLineUpdate(id, data);
    }
}