import { State, Action, StateContext, Selector } from '@ngxs/store';
import { patch, append } from '@ngxs/store/operators';
import { Question, Answer, QuestionService, HistoryService } from '../../api';
import { GetQuestion, SetAnswer, SaveAnswers, ResetQuestions } from './question.actions';
import { tap } from 'rxjs/operators';

export interface QuestionModel {
    current?: Question;
    answers?: Answer[];
}

@State<QuestionModel>({
    name: 'question'
})
export class QuestionState {
    @Selector()
    static current(state: QuestionModel) {
        return state.current;
    }

    constructor(private questionService: QuestionService, private historyService: HistoryService) {}

    @Action(GetQuestion)
    getQuestion(ctx: StateContext<QuestionModel>) {
        return this.questionService
            .questionRandom()
            .pipe(tap(result => ctx.patchState({ current: result })));
    }

    @Action(SetAnswer)
    setAnswer(ctx: StateContext<QuestionModel>, { payload }: SetAnswer) {
        return ctx.setState(
            patch({
                answers: append([payload])
            })
        );
    }

    @Action(SaveAnswers)
    SaveAnswers(ctx: StateContext<QuestionModel>) {
        return this.historyService
            .historyCreate({ answers: ctx.getState().answers })
            .pipe(tap(() => this.resetQuestions(ctx)));
    }

    @Action(ResetQuestions)
    resetQuestions(ctx: StateContext<QuestionModel>) {
        return ctx.setState({});
    }
}
