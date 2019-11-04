import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { History } from '../../../../core/api';
import { ModelCreatePage } from '../../abstract/model-create-page/model-create-page';

@Component({
    selector: 'tfg-history-create',
    templateUrl: './history-create.page.html',
    styleUrls: ['./history-create.page.scss']
})
export class HistoryCreatePage extends ModelCreatePage<History> {
    fields: FormlyFieldConfig[] = [
        {
            key: 'valoration',
            type: 'input',
            templateOptions: {
                required: true,
                label: 'valoration',
                type: 'number',
                min: 0,
                max: 1,
                step: 0.01
            }
        },
        {
            key: 'level',
            type: 'input',
            templateOptions: {
                required: true,
                label: 'level',
                type: 'number',
                min: 1
            }
        },
        {
            key: 'user',
            type: 'input',
            templateOptions: {
                required: true,
                label: 'user',
                type: 'foreignkey',
                readonly: false
            }
        }
    ];

    constructor(injector: Injector) {
        super(injector);
    }

    get(id: number) {
        return this.adminService.adminHistoryRead(id);
    }

    update(id: number, data: History) {
        return this.adminService.adminHistoryUpdate(id, data);
    }

    create(data: History) {
        return this.adminService.adminHistoryCreate(data);
    }
}
