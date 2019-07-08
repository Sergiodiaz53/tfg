import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MainPage } from './main.page';
import { QuestionsPage } from './questions/questions.page';
import { HistoriesPage } from './histories/histories.page';
import { HistoryPage } from './history/history.page';
import { ValorationComponent } from './questions/valoration/valoration.component';
import { HistoryStatsComponent } from './history-stats/history-stats.component';
import { ChartDirective } from '../directives/chart-js/chart-js.directive';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: MainPage
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
        ])
    ],
    declarations: [
        MainPage,
        QuestionsPage,
        ValorationComponent,
        HistoriesPage,
        HistoryPage,
        HistoryStatsComponent,
        ChartDirective
    ]
})
export class MainModule {}
