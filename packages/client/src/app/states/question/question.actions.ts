import { Answer } from '../../api';

export class GetQuestion {
    static readonly type = '[Question] Get Question';
}

export class SetAnswer {
    static readonly type = '[Question] Set Answer';

    constructor(public payload: Answer) {}
}

export class SetValoration {
    static readonly type = '[Question] Set Valoration';

    constructor(public valoration: number) {}
}

export class SaveAnswers {
    static readonly type = '[Question] Save Answer';
}

export class ResetQuestions {
    static readonly type = '[Question] Reset questions';
}
