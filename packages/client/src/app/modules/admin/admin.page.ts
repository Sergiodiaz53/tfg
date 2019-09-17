import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-admin-home-page',
    templateUrl: './admin.page.html',
    styleUrls: ['./admin.page.scss']
})
export class HomePage implements OnInit {
    name: string;
    models: { name: string; singular: string; endpoint: string }[] = [];
    selected: string;

    constructor(private router: Router, private route: ActivatedRoute) {}

    ngOnInit() {
        const data = this.route.snapshot.data;

        this.name = data.adminSpecs.name;
        this.models = data.adminSpecs.models;

        this.openModelInfo(this.models[0].endpoint);
    }

    openModelInfo(model: string) {
        this.router
            .navigate(['model-info'], {
                queryParams: { model },
                relativeTo: this.route
            })
            .then(() => {
                this.selected = model;
            });
    }
}
