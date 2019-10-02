import { Component } from '@angular/core';
import { QuestionLevel, AdminService, Questionary } from '../../../../core/api';
import { ModelListPage } from '../../abstract/model-list-page/model-list-page';
import { TableColumn } from '@swimlane/ngx-datatable';
import { merge } from 'rxjs';

@Component({
    selector: 'tfg-questionary',
    templateUrl: './questionary.page.html',
    styleUrls: ['./questionary.page.scss']
})
export class QuestionaryListPage extends ModelListPage<Questionary> {
    columns: TableColumn[] = [{ name: 'id', prop: 'id' }, { name: 'Info', prop: '_Str__' }];

    constructor(protected adminService: AdminService) {
        super();
    }

    getPage(page: number) {
        return this.adminService.adminQuestionaryList(page, this.pageSize);
    }

    remove(data: Questionary[]) {
        const delete$ = data.map(model => this.adminService.adminQuestionaryDelete(model.id));

        return merge(...delete$);
    }
}
