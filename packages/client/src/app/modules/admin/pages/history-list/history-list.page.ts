import { Component } from '@angular/core';
import { QuestionLevel, AdminService } from '../../../../core/api';
import { ModelListPage } from '../../abstract/model-list-page/model-list-page';
import { SizePipe } from '../../../../pipes/size/size.pipe';
import { TableColumn } from '@swimlane/ngx-datatable';
import { DecimalPipe, PercentPipe, DatePipe } from '@angular/common';

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

    constructor(protected adminService: AdminService) {
        super();
    }

    getPage(page: number) {
        return this.adminService.adminHistoryList(page, this.pageSize);
    }
}
