export class GetHistories {
    static readonly type = '[Histories] Get Histories';
}

export class GetStats {
    static readonly type = '[Histories] Get Stats';
}

export class GetHistory {
    static readonly type = '[Histories] Get History';

    constructor(public id: string) {}
}
