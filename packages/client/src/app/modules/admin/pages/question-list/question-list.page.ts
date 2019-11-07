import { Component, Injector, ViewChild, ElementRef } from '@angular/core';
import { TableColumn } from '@swimlane/ngx-datatable';
import { merge } from 'rxjs';
import { AdminQuestion } from '../../../../core/api';
import { ModelListPage } from '../../abstract/model-list-page/model-list-page';

@Component({
    selector: 'tfg-question-list',
    templateUrl: './question-list.page.html',
    styleUrls: ['./question-list.page.scss']
})
export class QuestionListPage extends ModelListPage<AdminQuestion> {
    columns: TableColumn[] = [
        { name: 'id', prop: 'id' },
        { name: 'Info', prop: '_Str__' },
        { name: 'Correct answer', prop: 'correctAnswer' },
        { name: 'Question level', prop: 'questionLevel' }
    ];
    loadingIndicator = false;

    @ViewChild('bulkFile', { read: ElementRef, static: true })
    bulkFile: ElementRef<HTMLInputElement>;

    constructor(injector: Injector) {
        super(injector);
    }

    getPage(page: number) {
        return this.adminService.adminQuestionList('id', page, this.pageSize);
    }

    remove(data: AdminQuestion[]) {
        const delete$ = data.map(model => this.adminService.adminQuestionDelete(model.id));

        return merge(...delete$);
    }

    onBulkUpload(files: File[]) {
        const file = files[0];

        this.loadingIndicator = true;

        this.adminService.adminQuestionBulk(file).subscribe(() => {
            this.bulkFile.nativeElement.value = '';
            this.onPage({ offset: 0 });
        });
    }
}
