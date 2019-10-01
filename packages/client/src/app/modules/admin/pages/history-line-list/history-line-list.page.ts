import { Component } from '@angular/core';
import { QuestionLevel, AdminService, HistoryLine } from '../../../../core/api';
import { ModelListPage } from '../../abstract/model-list-page/model-list-page';
import { TableColumn } from '@swimlane/ngx-datatable';

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

    constructor(protected adminService: AdminService) {
        super();
    }

    getPage(page: number) {
        return this.adminService.adminHistoryLineList(page, this.pageSize);
    }
}
