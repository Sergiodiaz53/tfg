/**
 * TFG API
 * Test description
 *
 * OpenAPI spec version: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface HistoryLine { 
    readonly id?: number;
    answer: HistoryLine.AnswerEnum;
    duration: number;
    image: string;
    correctAnswer: HistoryLine.CorrectAnswerEnum;
    history: number;
    readonly str?: string;
}
export namespace HistoryLine {
    export type AnswerEnum = 'left' | 'right';
    export const AnswerEnum = {
        Left: 'left' as AnswerEnum,
        Right: 'right' as AnswerEnum
    };
    export type CorrectAnswerEnum = 'left' | 'right';
    export const CorrectAnswerEnum = {
        Left: 'left' as CorrectAnswerEnum,
        Right: 'right' as CorrectAnswerEnum
    };
}

