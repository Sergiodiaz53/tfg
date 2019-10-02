import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getComponentRouteUrl } from '../../shared/utils';

@Component({
    selector: 'app-admin-home-page',
    templateUrl: './admin.page.html',
    styleUrls: ['./admin.page.scss']
})
export class AdminPage implements OnInit {
    name: string;
    models: { name: string; url: string }[] = [
        { name: 'Question Levels', url: 'model/question-level' },
        { name: 'Questions', url: 'model/question' },
        { name: 'History Lines', url: 'model/history-line' },
        { name: 'Histories', url: 'model/history' },
        { name: 'Questionaries', url: 'model/questionary' }
    ];

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.configModelUrls();
    }

    private configModelUrls() {
        const url = getComponentRouteUrl(this.route);
        this.models = this.models.map(model => ({ ...model, url: `${url}/${model.url}` }));
    }
}
