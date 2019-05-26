export class CreateHistory {
    static readonly type = '[History API] Create History';
}

export class GetHistories {
    static readonly type = '[History API] Get Histories';
}

export class GetHistory {
    static readonly type = '[History API] Get History';

    constructor(public id: string) {}
}