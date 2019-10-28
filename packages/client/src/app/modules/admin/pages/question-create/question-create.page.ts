import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { AdminQuestion } from '../../../../core/api';
import { ModelCreatePage } from '../../abstract/model-create-page/model-create-page';

@Component({
    selector: 'tfg-question-create',
    templateUrl: './question-create.page.html',
    styleUrls: ['./question-create.page.scss']
})
export class QuestionCreatePage extends ModelCreatePage<AdminQuestion> implements OnInit {
    fields: FormlyFieldConfig[] = [
        {
            key: 'image',
            type: 'file',
            templateOptions: {
                required: true,
                label: 'image',
                type: 'file',
                readonly: false
            }
        },
        {
            key: 'correctAnswer',
            type: 'select',
            templateOptions: {
                required: true,
                label: 'correct answer',
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
            key: 'questionLevel',
            type: 'input',
            templateOptions: {
                required: true,
                label: 'question level',
                type: 'foreignkey',
                readonly: false
            }
        }
    ];

    constructor(injector: Injector) {
        super(injector);
    }

    create(data: AdminQuestion) {
        console.log(data);
        return this.adminService.adminQuestionCreate(
            (data.image as any) as File,
            data.correctAnswer,
            data.questionLevel
        );
    }

    ngOnInit() {}
}
