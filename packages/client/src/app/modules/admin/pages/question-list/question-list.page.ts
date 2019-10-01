import { Component } from '@angular/core';
import { QuestionLevel, AdminService, Question } from '../../../../core/api';
import { ModelListPage } from '../../abstract/model-list-page/model-list-page';

@Component({
    selector: 'tfg-question-list',
    templateUrl: './question-list.page.html',
    styleUrls: ['./question-list.page.scss']
})
export class QuestionListPage extends ModelListPage<Question> {
    columns = [{ name: 'id', prop: 'id' }, { name: 'Info', prop: '_Str__' }];

    constructor(protected adminService: AdminService) {
        super();
    }

    getPage(page: number) {
        return this.adminService.adminQuestionList(page, this.pageSize);
    }
}
