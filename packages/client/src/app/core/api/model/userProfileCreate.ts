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


export interface UserProfileCreate { 
    readonly id?: number;
    sex: UserProfileCreate.SexEnum;
    years: number;
    weight: number;
    height: number;
    user: number;
}
export namespace UserProfileCreate {
    export type SexEnum = 'male' | 'female';
    export const SexEnum = {
        Male: 'male' as SexEnum,
        Female: 'female' as SexEnum
    };
}

