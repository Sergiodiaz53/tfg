import { AnswerButtonGroupComponent } from './components/answer-button-group/answer-button-group.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './pages/home/home.page';
import { HistoriesPage } from './pages/histories/histories.page';
import { HistoryPage } from './pages/history/history.page';
import { ValorationComponent } from './components/valoration/valoration.component';
import { HistoryStatsComponent } from './components/history-stats/history-stats.component';
import { ChartDirective } from '../../shared/directives/chart-js/chart-js.directive';
import { TranslateModule } from '@ngx-translate/core';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';
import { ValorationPage } from './pages/valoration/valoration.page';
import { QuestionsPage } from './pages/questions/questions.page';
import { BeforeStartPage } from './pages/before-start/before-start.page';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: HomePage
            },
            {
                path: 'valoration',
                component: ValorationPage
            },
            {
                path: 'before-start',
                component: BeforeStartPage
            },
            {
                path: 'questions',
                component: QuestionsPage
            },
            {
                path: 'histories',
                component: HistoriesPage
            },
            {
                path: 'histories/:id',
                component: HistoryPage
            }
        ]),
        TranslateModule.forChild(),
        SharedComponentsModule
    ],
    declarations: [
        HomePage,
        ValorationComponent,
        ValorationPage,
        BeforeStartPage,
        QuestionsPage,
        HistoriesPage,
        HistoryPage,
        HistoryStatsComponent,
        AnswerButtonGroupComponent,
        ChartDirective
    ]
})
export class MainModule {}
