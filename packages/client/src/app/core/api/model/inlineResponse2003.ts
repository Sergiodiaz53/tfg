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
import { Question } from './question';


export interface InlineResponse2003 { 
    next?: string | null;
    previous?: string | null;
    count: number;
    results: Array<Question>;
}

