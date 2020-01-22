import { Injector, OnInit } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, take } from 'rxjs/operators';
import { AdminService } from '../../../../core/api';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

export abstract class ModelCreatePage<M> implements OnInit {
    abstract fields: FormlyFieldConfig[];

    errors$ = new BehaviorSubject<any>({});

    model: Partial<M>;

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

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe(params => {
            if (params.has('id')) {
                this.get(+params.get('id'))
                    .pipe(
                        take(1),
                        tap(data => (this.model = data))
                    )
                    .subscribe();
            }
        });
    }

    abstract create(data: M): Observable<M>;
    abstract get(id: number): Observable<M>;
    abstract update(id: number, data: M): Observable<M>;

    onSubmit(data: M) {
        const fileFields = this.fields.filter(field => field.type === 'file');
        if (fileFields.length) {
            for (const fileField of fileFields) {
                if (data[fileField.key] instanceof FileList) {
                    data[fileField.key] = data[fileField.key][0];
                } else {
                    delete data[fileField.key];
                }
            }
        }

        const modelId = (data as any).id;
        const getOrCreate$ = modelId ? this.update(modelId, data) : this.create(data);

        getOrCreate$.pipe(take(1)).subscribe({
            next: () =>
                this.navController.navigateBack([modelId ? '../../' : '../'], {
                    relativeTo: this.activatedRoute
                }),
            error: e => this.onCreateError(e)
        });
    }

    private onCreateError(e) {
        this.errors$.next(e.error);
    }
}
