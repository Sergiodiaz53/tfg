import { Component, Injector } from '@angular/core';
import { TableColumn } from '@swimlane/ngx-datatable';
import { merge } from 'rxjs';
import { QuestionLevel } from '../../../../core/api';
import { SizePipe } from '../../../../pipes/size/size.pipe';
import { ModelListPage } from '../../abstract/model-list-page/model-list-page';

@Component({
    selector: 'tfg-question-level-list',
    templateUrl: './question-level-list.page.html',
    styleUrls: ['./question-level-list.page.scss']
})
export class QuestionLevelListPage extends ModelListPage<QuestionLevel> {
    columns: TableColumn[] = [
        { name: 'id', prop: 'id' },
        { name: 'Info', prop: '_Str__' },
        { name: 'Level', prop: 'level' },
        { name: 'Questions', prop: 'questions', pipe: new SizePipe() }
    ];

    constructor(injector: Injector) {
        super(injector);
    }

    getPage(page: number) {
        return this.adminService.adminQuestionLevelList('id', page, this.pageSize);
    }

    remove(data: QuestionLevel[]) {
        const delete$ = data.map(model => this.adminService.adminQuestionLevelDelete(model.id));

        return merge(...delete$);
    }
}
