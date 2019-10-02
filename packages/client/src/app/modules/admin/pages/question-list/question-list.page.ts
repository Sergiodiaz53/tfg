import { Component, Injector } from '@angular/core';
import { TableColumn } from '@swimlane/ngx-datatable';
import { merge } from 'rxjs';
import { Question } from '../../../../core/api';
import { ModelListPage } from '../../abstract/model-list-page/model-list-page';

@Component({
    selector: 'tfg-question-list',
    templateUrl: './question-list.page.html',
    styleUrls: ['./question-list.page.scss']
})
export class QuestionListPage extends ModelListPage<Question> {
    columns: TableColumn[] = [
        { name: 'id', prop: 'id' },
        { name: 'Info', prop: '_Str__' },
        { name: 'Correct answer', prop: 'correctAnswer' },
        { name: 'Question level', prop: 'questionLevel' }
    ];

    constructor(injector: Injector) {
        super(injector);
    }

    getPage(page: number) {
        return this.adminService.adminQuestionList(page, this.pageSize);
    }

    remove(data: Question[]) {
        const delete$ = data.map(model => this.adminService.adminQuestionDelete(model.id));

        return merge(...delete$);
    }
}
