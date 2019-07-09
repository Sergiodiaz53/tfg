import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './pages/home/home.page';
import { QuestionsPage } from './pages/questions/questions.page';
import { HistoriesPage } from './pages/histories/histories.page';
import { HistoryPage } from './components/history/history.page';
import { ValorationComponent } from './components/valoration/valoration.component';
import { HistoryStatsComponent } from './components/history-stats/history-stats.component';
import { ChartDirective } from '../../shared/directives/chart-js/chart-js.directive';

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
        HomePage,
        QuestionsPage,
        ValorationComponent,
        HistoriesPage,
        HistoryPage,
        HistoryStatsComponent,
        ChartDirective
    ]
})
export class MainModule {}
