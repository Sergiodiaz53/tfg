import { Component } from '@angular/core';
import { QuestionLevel, AdminService } from '../../../../core/api';
import { ModelListPage } from '../../abstract/model-list-page/model-list-page';

@Component({
    selector: 'tfg-history-list',
    templateUrl: './history-list.page.html',
    styleUrls: ['./history-list.page.scss']
})
export class HistoryListPage extends ModelListPage<History> {
    columns = [{ name: 'id', prop: 'id' }, { name: 'Info', prop: '_Str__' }];

    constructor(protected adminService: AdminService) {
        super();
    }

    getPage(page: number) {
        return this.adminService.adminHistoryList(page, this.pageSize);
    }
}
