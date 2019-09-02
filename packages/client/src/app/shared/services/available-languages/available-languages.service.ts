import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AvailableLanguagesService {
    languages = {};

    constructor(private httpClient: HttpClient) {}

    init() {
        return this.httpClient
            .get('./assets/lang/available_languages.json')
            .pipe(tap(data => (this.languages = data)));
    }

    has(language: string) {
        return Object.keys(this.languages).includes(language);
    }

    get(language: string) {
        return this.languages[language];
    }
}
