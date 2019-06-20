import { State, Action, StateContext, Selector } from '@ngxs/store';
import { HistoryList, HistoryStats, HistoryDetail, HistoryService } from '../../api';
import { GetHistories, GetStats, GetHistory } from './histories.actions';
import { tap } from 'rxjs/operators';

export interface HistoriesModel {
    stats?: HistoryStats;
    current?: HistoryDetail;
    histories?: HistoryList[];
}

@State<HistoriesModel>({
    name: 'histories'
})
export class HistoriesState {
    constructor(private historyService: HistoryService) {}

    @Action(GetHistories)
    getHistories(ctx: StateContext<HistoriesModel>) {
        return this.historyService
            .historyList()
            .pipe(tap(result => ctx.patchState({ histories: result })));
    }

    @Action(GetStats)
    getStats(ctx: StateContext<HistoriesModel>) {
        return this.historyService
            .historyStats()
            .pipe(tap(result => ctx.patchState({ stats: result })));
    }

    @Action(GetHistory)
    getHistory(ctx: StateContext<HistoriesModel>, { id }: GetHistory) {
        return this.historyService
            .historyRead(id)
            .pipe(tap(result => ctx.patchState({ current: result })));
    }
}
