import { Component } from '@angular/core';
import { QuestionLevel, AdminService, HistoryLine } from '../../../../core/api';
import { ModelListPage } from '../../abstract/model-list-page/model-list-page';

@Component({
    selector: 'tfg-history-line-list',
    templateUrl: './history-line-list.page.html',
    styleUrls: ['./history-line-list.page.scss']
})
export class HistoryLineListPage extends ModelListPage<HistoryLine> {
    columns = [{ name: 'id', prop: 'id' }, { name: 'Info', prop: '_Str__' }];

    constructor(protected adminService: AdminService) {
        super();
    }

    getPage(page: number) {
        return this.adminService.adminHistoryLineList(page, this.pageSize);
    }
}
