import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPage } from './admin.page';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyIonicModule } from '@ngx-formly/ionic';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { QuestionLevelListPage } from './pages/question-level-list/question-level-list.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ApiModule } from '../../core/api';
import { QuestionListPage } from './pages/question-list/question-list.page';
import { HistoryLineListPage } from './pages/history-line-list/history-line-list.page';
import { HistoryListPage } from './pages/history-list/history-list.page';
import { QuestionaryListPage } from './pages/questionary/questionary.page';
import { PipesModule } from '../../pipes/pipes.module';
import { ModelListComponent } from './components/model-list/model-list.component';
import { ModelCreateComponent } from './components/model-create/model-create.component';
import { QuestionLevelCreatePage } from './pages/question-level-create/question-level-create.page';
import { QuestionCreatePage } from './pages/question-create/question-create.page';
import { FormlyFieldFile } from './components/file-type/file-type.component';
import { FileValueAccessor } from './components/file-type/file-value-accesor';
import { HistoryCreatePage } from './pages/history-create/history-create.page';

@NgModule({
    declarations: [
        AdminPage,
        SidebarComponent,
        HeaderComponent,
        QuestionLevelListPage,
        QuestionLevelCreatePage,
        QuestionListPage,
        QuestionCreatePage,
        HistoryLineListPage,
        HistoryListPage,
        HistoryCreatePage,
        QuestionaryListPage,
        ModelListComponent,
        ModelCreateComponent,
        FormlyFieldFile,
        FileValueAccessor
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: AdminPage,
                children: [
                    {
                        path: 'model/question-level',
                        component: QuestionLevelListPage
                    },
                    {
                        path: 'model/question-level/edit',
                        component: QuestionLevelCreatePage
                    },
                    {
                        path: 'model/question',
                        component: QuestionListPage
                    },
                    {
                        path: 'model/question/edit',
                        component: QuestionCreatePage
                    },
                    {
                        path: 'model/question/:id',
                        component: QuestionListPage
                    },
                    {
                        path: 'model/history-line',
                        component: HistoryLineListPage
                    },
                    {
                        path: 'model/history-line/:id',
                        component: HistoryLineListPage
                    },
                    {
                        path: 'model/history',
                        component: HistoryListPage
                    },
                    {
                        path: 'model/history/edit',
                        component: HistoryCreatePage
                    },
                    {
                        path: 'model/history/:id',
                        component: HistoryListPage
                    },
                    {
                        path: 'model/questionary',
                        component: QuestionaryListPage
                    },
                    {
                        path: 'model/questionary/:id',
                        component: QuestionaryListPage
                    }
                ]
            }
        ]),
        TranslateModule.forChild(),
        ReactiveFormsModule,
        FormlyModule.forRoot({
            types: [
                {
                    name: 'file',
                    component: FormlyFieldFile,
                    wrappers: ['form-field']
                }
            ],
            validationMessages: [
                { name: 'required', message: 'This field is required' },
                { name: 'other', message: (err, field) => err }
            ]
        }),
        FormlyIonicModule,
        NgxDatatableModule,
        PipesModule
    ],
    providers: []
})
export class AdminModule {}
