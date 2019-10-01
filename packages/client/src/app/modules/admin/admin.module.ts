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

@NgModule({
    declarations: [
        AdminPage,
        SidebarComponent,
        HeaderComponent,
        QuestionLevelListPage,
        QuestionListPage,
        HistoryLineListPage,
        HistoryListPage,
        QuestionaryListPage
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
                        path: 'model/question-level/:id',
                        component: QuestionLevelListPage
                    },
                    {
                        path: 'model/question',
                        component: QuestionListPage
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
        FormlyModule.forRoot(),
        FormlyIonicModule,
        NgxDatatableModule,
        PipesModule
    ],
    providers: []
})
export class AdminModule {}
