import { Component, OnInit } from '@angular/core';
import { HistoryLineDetail, Question } from '../../api';
import { HistoryService } from '../../services/history/history.service';
import { ActivatedRoute, Router } from '@angular/router';
import { flatMap, tap, finalize } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';
import { Location } from '@angular/common';
import { of, EMPTY } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { QuestionState } from '../../states/question/question.state';
import { GetQuestion, SetAnswer, SaveAnswers } from '../../states/question/question.actions';
import { Answer } from '../../../../client/src/app/api';

// TODO: Get from server
const ANSWERS = 10;

@Component({
    selector: 'app-questions',
    templateUrl: 'questions.page.html',
    styleUrls: ['questions.page.scss']
})
export class QuestionsPage implements OnInit {
    @Select(QuestionState.current)
    question$: Question;

    private questionStarted: number;

    constructor(private location: Location, private store: Store) {}

    ngOnInit() {
        this.getNextQuestion().subscribe();
    }

    async answer(answer: Answer.AnswerEnum) {
        const setAnswer = new SetAnswer({
            answer,
            duration: Date.now() - this.questionStarted,
            questionId: this.store.selectSnapshot(QuestionState.current).id
        });

        this.store
            .dispatch(setAnswer)
            .pipe(
                flatMap(() => {
                    if (
                        this.store.selectSnapshot(state => state.question.answers).length ===
                        ANSWERS
                    ) {
                        return this.store
                            .dispatch(new SaveAnswers())
                            .pipe(tap(() => this.location.back()));
                    } else {
                        return this.getNextQuestion();
                    }
                })
            )
            .subscribe();
    }

    private getNextQuestion() {
        return this.store.dispatch(new GetQuestion()).pipe(
            tap(() => {
                this.questionStarted = Date.now();
            })
        );
    }
}
