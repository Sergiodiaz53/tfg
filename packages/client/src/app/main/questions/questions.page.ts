import { Component, OnInit } from '@angular/core';
import { HistoryLineSimple, HistoryLineDetail } from '../../api';
import { HistoryService } from '../../services/history/history.service';
import { ActivatedRoute } from '@angular/router';
import { flatMap, tap, finalize } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-questions',
  templateUrl: 'questions.page.html',
  styleUrls: ['questions.page.scss'],
})
export class QuestionsPage implements OnInit {

  question: HistoryLineSimple;

  constructor(
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
      answer, duration: 0
    }).pipe(
      flatMap(() => this.getNextQuestion()),
      finalize(() => loading.dismiss())
    ).subscribe();
  }

  private getNextQuestion() {
    return this.historyService.nextQuestion(+this.route.snapshot.paramMap.get('id'))
      .pipe(
        tap(
          question => this.question = question
        )
      );
  }
}
