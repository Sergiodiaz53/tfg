import { flatMap, tap } from 'rxjs/operators';

import { State, Action, StateContext } from '@ngxs/store';

import { HistoryService, HistoryDetail } from '../modules/api';

import { CreateHistory, GetHistories, GetHistory } from './history.actions';

@State<HistoryDetail[]>({
    name: 'history',
    defaults: []
})
export class HistoryState {
    constructor(private historyService: HistoryService) {}

    // @Action(CreateHistory)
    // createHistory(ctx: StateContext<HistoryDetail[]>) {
    //     return this.historyService.historyCreate();
    // }

    @Action(GetHistories)
    getHistories(ctx: StateContext<HistoryDetail[]>) {
        return this.historyService.historyList();
    }

    @Action(GetHistory)
    getHistory(ctx: StateContext<HistoryDetail[]>, data: GetHistory) {
        return this.historyService.historyRead(data.id)
            .pipe(
                tap(history => ctx.patchState([...ctx.getState(), history]))
            );
    }
}