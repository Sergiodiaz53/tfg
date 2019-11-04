import { Component, Injector } from '@angular/core';
import { TableColumn } from '@swimlane/ngx-datatable';
import { merge } from 'rxjs';
import { HistoryLine } from '../../../../core/api';
import { ModelListPage } from '../../abstract/model-list-page/model-list-page';

@Component({
    selector: 'tfg-history-line-list',
    templateUrl: './history-line-list.page.html',
    styleUrls: ['./history-line-list.page.scss']
})
export class HistoryLineListPage extends ModelListPage<HistoryLine> {
    columns: TableColumn[] = [
        { name: 'id', prop: 'id' },
        { name: 'History', prop: 'history' },
        { name: 'Answer', prop: 'answer' },
        { name: 'Correct answer', prop: 'correctAnswer' },
        { name: 'Duration', prop: 'duration' }
    ];

    constructor(injector: Injector) {
        super(injector);
    }

    getPage(page: number) {
        return this.adminService.adminHistoryLineList('-id', page, this.pageSize);
    }

    remove(data: HistoryLine[]) {
        const delete$ = data.map(model => this.adminService.adminHistoryLineDelete(model.id));

        return merge(...delete$);
    }
}
