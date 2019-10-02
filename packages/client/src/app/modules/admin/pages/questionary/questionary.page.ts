import { Component, Injector } from '@angular/core';
import { TableColumn } from '@swimlane/ngx-datatable';
import { merge } from 'rxjs';
import { Questionary } from '../../../../core/api';
import { ModelListPage } from '../../abstract/model-list-page/model-list-page';

@Component({
    selector: 'tfg-questionary',
    templateUrl: './questionary.page.html',
    styleUrls: ['./questionary.page.scss']
})
export class QuestionaryListPage extends ModelListPage<Questionary> {
    columns: TableColumn[] = [{ name: 'id', prop: 'id' }, { name: 'Info', prop: '_Str__' }];

    constructor(injector: Injector) {
        super(injector);
    }

    getPage(page: number) {
        return this.adminService.adminQuestionaryList(page, this.pageSize);
    }

    remove(data: Questionary[]) {
        const delete$ = data.map(model => this.adminService.adminQuestionaryDelete(model.id));

        return merge(...delete$);
    }
}
