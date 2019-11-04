import { Component, Injector } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { HistoryLine } from '../../../../core/api';
import { ModelCreatePage } from '../../abstract/model-create-page/model-create-page';

@Component({
    selector: 'tfg-history-line-create',
    templateUrl: './history-line-create.page.html',
    styleUrls: ['./history-line-create.page.scss']
})
export class HistoryLineCreatePage extends ModelCreatePage<HistoryLine> {
    fields: FormlyFieldConfig[] = [
        {
            key: 'answer',
            type: 'select',
            templateOptions: {
                required: true,
                label: 'answer',
                type: 'select',
                options: [
                    {
                        label: 'left',
                        value: 'left'
                    },
                    {
                        label: 'right',
                        value: 'right'
                    }
                ],
                readonly: false
            }
        },
        {
            key: 'duration',
            type: 'input',
            templateOptions: {
                required: true,
                label: 'duration',
                type: 'number',
                readonly: false
            }
        },
        {
            key: 'image',
            type: 'input',
            templateOptions: {
                required: true,
                label: 'image',
                type: 'input',
                readonly: false
            }
        },
        {
            key: 'correctAnswer',
            type: 'select',
            templateOptions: {
                required: true,
                label: 'correctAnswer',
                type: 'select',
                options: [
                    {
                        label: 'left',
                        value: 'left'
                    },
                    {
                        label: 'right',
                        value: 'right'
                    }
                ],
                readonly: false
            }
        },
        {
            key: 'history',
            type: 'input',
            templateOptions: {
                required: true,
                label: 'history',
                type: 'foreignkey',
                readonly: false
            }
        }
    ];

    constructor(injector: Injector) {
        super(injector);
    }

    get(id: number) {
        return this.adminService.adminHistoryLineRead(id);
    }

    update(id: number, data: HistoryLine) {
        return this.adminService.adminHistoryLineUpdate(id, data);
    }

    create(data: HistoryLine) {
        return this.adminService.adminHistoryLineCreate(data);
    }
}
