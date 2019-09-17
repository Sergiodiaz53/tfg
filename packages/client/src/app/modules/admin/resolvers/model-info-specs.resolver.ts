import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';

import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccessTokenService, Configuration } from '../../../core/api';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ModelInfoResolver implements Resolve<FormlyFieldConfig[]> {
    constructor(private http: HttpClient, private configuration: Configuration) {}

    resolve(route: ActivatedRouteSnapshot) {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', this.configuration.apiKeys['Authorization']);

        const model = route.queryParams.model;

        return this.http
            .options<any>(`${this.configuration.basePath}/${model}`)
            .pipe(tap(console.log));
    }
}
