import { DatePipe, PercentPipe } from '@angular/common';
import { Component, Injector } from '@angular/core';
import { TableColumn } from '@swimlane/ngx-datatable';
import { merge } from 'rxjs';
import { History } from '../../../../core/api';
import { SizePipe } from '../../../../pipes/size/size.pipe';
import { ModelListPage } from '../../abstract/model-list-page/model-list-page';

@Component({
    selector: 'tfg-history-list',
    templateUrl: './history-list.page.html',
    styleUrls: ['./history-list.page.scss']
})
export class HistoryListPage extends ModelListPage<History> {
    columns: TableColumn[] = [
        { name: 'id', prop: 'id' },
        { name: 'Created', prop: 'created', pipe: new DatePipe('en-eu') },
        { name: 'User', prop: 'user' },
        { name: 'Level', prop: 'level' },
        { name: 'Valoration', prop: 'valoration', pipe: new PercentPipe('en-eu') },
        { name: 'History lines', prop: 'historyLines', pipe: new SizePipe() }
    ];

    constructor(injector: Injector) {
        super(injector);
    }

    getPage(page: number) {
        return this.adminService.adminHistoryList(page, this.pageSize);
    }

    remove(data: History[]) {
        const delete$ = data.map(model => this.adminService.adminHistoryDelete(model.id));

        return merge(...delete$);
    }
}
