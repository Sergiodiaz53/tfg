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
import { HistoryLineDetail } from './historyLineDetail';


export interface HistoryDetail { 
    readonly id?: number;
    level: number;
    closed?: boolean;
    historyLines: Array<HistoryLineDetail>;
}

