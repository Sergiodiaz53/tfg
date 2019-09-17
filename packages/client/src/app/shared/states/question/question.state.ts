import { State, Action, StateContext, Selector } from '@ngxs/store';
import { patch, append } from '@ngxs/store/operators';
import {
    QuestionSimple,
    Answer,
    QuestionService,
    HistoryService,
    AnswerBatch
} from '../../../core/api';
import {
    GetQuestion,
    SetAnswer,
    SaveAnswers,
    ResetQuestions,
    SetValoration
} from './question.actions';
import { tap } from 'rxjs/operators';

export interface QuestionModel extends Partial<AnswerBatch> {
    current?: QuestionSimple;
}

@State<QuestionModel>({
    name: 'question',
    defaults: { answers: [] }
})
export class QuestionState {
    @Selector()
    static current(state: QuestionModel) {
        return state.current;
    }

    constructor(private questionService: QuestionService, private historyService: HistoryService) {}

    @Action(GetQuestion)
    getQuestion(ctx: StateContext<QuestionModel>) {
        const answers = ctx.getState().answers;
        let exclude = null;

        if (answers.length) {
            exclude = answers.map(answer => answer.questionId);
        }

        return this.questionService
            .questionRandom(exclude)
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

    @Action(SetValoration)
    setValoration(ctx: StateContext<QuestionModel>, { valoration }: SetValoration) {
        return ctx.patchState({ valoration });
    }

    @Action(SaveAnswers)
    SaveAnswers(ctx: StateContext<QuestionModel>) {
        return this.historyService
            .historyCreate({
                answers: ctx.getState().answers,
                valoration: ctx.getState().valoration
            })
            .pipe(tap(() => this.resetQuestions(ctx)));
    }

    @Action(ResetQuestions)
    resetQuestions(ctx: StateContext<QuestionModel>) {
        return ctx.setState({ answers: [] });
    }
}
