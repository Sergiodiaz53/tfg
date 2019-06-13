import { Injectable } from '@angular/core';
import { HistoryService as HistoryApiService } from '../../api';
import { EMPTY } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HistoryService {
    constructor(
        private historyApiService: HistoryApiService
    ) {}

    // TODO: Fix create
    create() {
        return EMPTY;
        // return this.historyApiService.historyCreate();
    }

    getAll() {
        return this.historyApiService.historyList();
    }

    get(id: number) {
        return this.historyApiService.historyRead(`${id}`)
    }
}