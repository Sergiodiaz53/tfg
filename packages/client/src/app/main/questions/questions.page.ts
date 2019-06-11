import { Component, OnInit } from '@angular/core';
import { HistoryLineSimple, HistoryLineDetail } from '../../api';
import { HistoryService } from '../../services/history/history.service';
import { ActivatedRoute, Router } from '@angular/router';
import { flatMap, tap, finalize } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';
import { Location } from '@angular/common';
import { of } from 'rxjs';

@Component({
  selector: 'app-questions',
  templateUrl: 'questions.page.html',
  styleUrls: ['questions.page.scss'],
})
export class QuestionsPage implements OnInit {

  question: HistoryLineSimple;

  private questionStarted: number;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private historyService: HistoryService
  ) {}

  ngOnInit() {
    this.getNextQuestion().subscribe();
  }

  async answer(answer: HistoryLineDetail.AnswerEnum) {
    const loading = await this.loadingController.create();
    await loading.present();

    this.historyService.sendAnswer(this.question.id, {
      answer, duration: Date.now() - this.questionStarted
    }).pipe(
      flatMap(() => {
        if (!this.question.historyClosed) {
          return this.getNextQuestion()
        } else {
          return of(this.location.back());
        }
      }),
      finalize(() => loading.dismiss())
    ).subscribe();
  }

  private getNextQuestion() {
    return this.historyService.nextQuestion(+this.route.snapshot.paramMap.get('id'))
      .pipe(
        tap(
          question => {
            this.question = question;
            this.questionStarted = Date.now();
          }
        )
      );
  }
}
