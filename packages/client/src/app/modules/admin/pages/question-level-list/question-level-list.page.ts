import { Component } from '@angular/core';
import { QuestionLevel, AdminService } from '../../../../core/api';
import { ModelListPage } from '../../abstract/model-list-page/model-list-page';

@Component({
    selector: 'tfg-question-level-list',
    templateUrl: './question-level-list.page.html',
    styleUrls: ['./question-level-list.page.scss']
})
export class QuestionLevelListPage extends ModelListPage<QuestionLevel> {
    columns = [{ name: 'id', prop: 'id' }, { name: 'Info', prop: '_Str__' }];

    constructor(protected adminService: AdminService) {
        super();
    }

    getPage(page: number) {
        return this.adminService.adminQuestionLevelList(page, this.pageSize);
    }
}
