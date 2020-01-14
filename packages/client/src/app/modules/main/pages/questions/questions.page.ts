import { Component, OnInit } from '@angular/core';
import { QuestionSimple, Answer } from '../../../../core/api';
import { flatMap, tap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Select, Store } from '@ngxs/store';
import { QuestionState } from '../../../../shared/states/question/question.state';
import {
    GetQuestion,
    SetAnswer,
    SaveAnswers,
    SetValoration
} from '../../../../shared/states/question/question.actions';

// TODO: Get from server
const ANSWERS = 10;

@Component({
    selector: 'app-questions',
    templateUrl: 'questions.page.html',
    styleUrls: ['questions.page.scss']
})
export class QuestionsPage implements OnInit {
    @Select(QuestionState.current)
    question$: QuestionSimple;

    private valoration;

    private questionStarted: number;

    constructor(private location: Location, private store: Store) {}

    ngOnInit() {}

    onValoration(valoration: number) {
        this.store
            .dispatch(new SetValoration(valoration))
            .pipe(flatMap(() => this.getNextQuestion()))
            .subscribe();
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
