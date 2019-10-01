import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

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

    constructor(private route: ActivatedRoute) {
        console.log(this.route);
    }

    ngOnInit() {
        this.configModelUrls();
    }

    private configModelUrls() {
        const url = this.getComponentRouteUrl();
        this.models = this.models.map(model => ({ ...model, url: `${url}/${model.url}` }));
    }

    private getComponentRouteUrl() {
        return this.route.snapshot.pathFromRoot.map(route => route.url.join('/')).join('/');
    }
}
