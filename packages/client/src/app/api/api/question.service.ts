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
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpEvent } from '@angular/common/http';
import { CustomHttpUrlEncodingCodec } from '../encoder';

import { Observable } from 'rxjs';

import { Question } from '../model/question';

import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';

@Injectable({
    providedIn: 'root'
})
export class QuestionService {
    protected basePath = 'http://localhost:8000/api';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(
        protected httpClient: HttpClient,
        @Optional() @Inject(BASE_PATH) basePath: string,
        @Optional() configuration: Configuration
    ) {
        if (configuration) {
            this.configuration = configuration;
            this.configuration.basePath = configuration.basePath || basePath || this.basePath;
        } else {
            this.configuration.basePath = basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }

    /**
     *
     *
     * @param exclude question exclude param
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public questionRandom(
        exclude?: Array<number>,
        observe?: 'body',
        reportProgress?: boolean
    ): Observable<Question>;
    public questionRandom(
        exclude?: Array<number>,
        observe?: 'response',
        reportProgress?: boolean
    ): Observable<HttpResponse<Question>>;
    public questionRandom(
        exclude?: Array<number>,
        observe?: 'events',
        reportProgress?: boolean
    ): Observable<HttpEvent<Question>>;
    public questionRandom(
        exclude?: Array<number>,
        observe: any = 'body',
        reportProgress: boolean = false
    ): Observable<any> {
        let queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
        if (exclude) {
            queryParameters = queryParameters.set(
                'exclude',
                exclude.join(COLLECTION_FORMATS['csv'])
            );
        }

        let headers = this.defaultHeaders;

        // authentication (Token) required
        if (this.configuration.apiKeys && this.configuration.apiKeys['Authorization']) {
            headers = headers.set('Authorization', this.configuration.apiKeys['Authorization']);
        }

        // to determine the Accept header
        const httpHeaderAccepts: string[] = ['application/json'];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(
            httpHeaderAccepts
        );
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [];

        return this.httpClient.get<Question>(`${this.configuration.basePath}/question/random/`, {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
}
