import { Component, Injector, OnInit } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { QuestionLevel } from '../../../../core/api';
import { ModelCreatePage } from '../../abstract/model-create-page/model-create-page';

@Component({
    selector: 'tfg-question-level-create',
    templateUrl: './question-level-create.page.html',
    styleUrls: ['./question-level-create.page.scss']
})
export class QuestionLevelCreatePage extends ModelCreatePage<QuestionLevel> implements OnInit {
    fields: FormlyFieldConfig[] = [
        {
            key: 'level',
            type: 'input',
            templateOptions: {
                required: true,
                min: 0,
                label: 'level',
                type: 'number',
                readonly: false
            },
            defaultValue: null
        },
        {
            key: 'averageDuration',
            type: 'input',
            templateOptions: {
                required: false,
                min: 0,
                label: 'average duration',
                type: '',
                readonly: false
            },
            defaultValue: 0
        },
        {
            key: 'durationThreshold',
            type: 'input',
            templateOptions: {
                required: false,
                min: 0,
                max: 100,
                label: 'duration threshold',
                type: 'number',
                readonly: false
            },
            defaultValue: 0
        }
    ];

    constructor(injector: Injector) {
        super(injector);
    }

    update(id: number, data: QuestionLevel) {
        return this.adminService.adminQuestionLevelUpdate(id, data);
    }

    create(data: QuestionLevel) {
        return this.adminService.adminQuestionLevelCreate(data);
    }

    get(id: number) {
        return this.adminService.adminQuestionLevelRead(id);
    }
}
