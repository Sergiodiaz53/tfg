import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MainPage } from './main.page';
import { QuestionsPage } from './questions/questions.page';
import { HistoryGuard } from '../guards/history.guard';
import { CommonDirectivesModule } from '../directives/directives.module';

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
        path: 'questions/:id',
        component: QuestionsPage,
        resolve: [HistoryGuard]
      }
    ]),
    CommonDirectivesModule
  ],
  declarations: [
    MainPage,
    QuestionsPage
  ],
  providers: [
    HistoryGuard
  ]
})
export class MainModule {}
