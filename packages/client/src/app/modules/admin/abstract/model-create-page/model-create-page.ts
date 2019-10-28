import { Injector, OnInit } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AdminService } from '../../../../core/api';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

export abstract class ModelCreatePage<M> implements OnInit {
    abstract fields: FormlyFieldConfig[];

    errors$ = new BehaviorSubject<any>({});

    protected model: Partial<M>;

    protected adminService: AdminService;
    protected router: Router;
    protected activatedRoute: ActivatedRoute;
    protected navController: NavController;

    constructor(injector: Injector) {
        this.adminService = injector.get(AdminService);
        this.router = injector.get(Router);
        this.activatedRoute = injector.get(ActivatedRoute);
        this.navController = injector.get(NavController);
    }

    ngOnInit() {}

    abstract create(data: M): Observable<M>;

    onSubmit(data: M) {
        const fileFields = this.fields.filter(field => field.type === 'file');
        if (fileFields.length) {
            for (const fileField of fileFields) {
                data[fileField.key] = data[fileField.key][0];
            }
        }

        this.create(data).subscribe({
            next: () =>
                this.navController.navigateBack(['../'], { relativeTo: this.activatedRoute }),
            error: e => this.onCreateError(e)
        });
    }

    private onCreateError(e) {
        this.errors$.next(e.error);
    }
}
