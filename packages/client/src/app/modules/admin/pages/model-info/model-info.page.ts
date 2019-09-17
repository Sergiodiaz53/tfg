import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormlyField, FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
    selector: 'tfg-model',
    templateUrl: './model-info.page.html',
    styleUrls: ['./model-info.page.scss']
})
export class ModelInfoPage implements OnInit, OnDestroy {
    formSpecs: FormlyFieldConfig[] = [];
    form = new FormGroup({});
    model = {};

    private route$: Subscription;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route$ = this.route.data
            .pipe(
                tap(data => {
                    this.formSpecs = data.modelInfo;
                    this.form = new FormGroup({});
                    this.model = {};
                })
            )
            .subscribe();
    }

    ngOnDestroy() {
        this.route$.unsubscribe();
    }

    onSubmit(model: any) {
        console.log(model);
    }
}
