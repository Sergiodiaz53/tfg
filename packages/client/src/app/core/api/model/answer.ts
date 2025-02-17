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


export interface Answer { 
    answer: Answer.AnswerEnum;
    duration: number;
    questionId: number;
}
export namespace Answer {
    export type AnswerEnum = 'left' | 'right';
    export const AnswerEnum = {
        Left: 'left' as AnswerEnum,
        Right: 'right' as AnswerEnum
    };
}

