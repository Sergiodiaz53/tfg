import { Component } from '@angular/core';
import { QuestionLevel, AdminService } from '../../../../core/api';
import { ModelListPage } from '../../abstract/model-list-page/model-list-page';
import { TableColumn } from '@swimlane/ngx-datatable';
import { SizePipe } from '../../../../pipes/size/size.pipe';

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

    constructor(protected adminService: AdminService) {
        super();
    }

    getPage(page: number) {
        return this.adminService.adminQuestionLevelList(page, this.pageSize);
    }
}
