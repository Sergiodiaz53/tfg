import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';

import { MainPage } from './main.page';
import { QuestionsPage } from './questions/questions.page';
import { HistoriesPage } from './histories/histories.page';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HistoryPage } from './history/history.page';
import { ValorationComponent } from './questions/valoration/valoration.component';

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
        // ChartsModule
    ],
    declarations: [MainPage, QuestionsPage, ValorationComponent, HistoriesPage, HistoryPage]
})
export class MainModule {}
