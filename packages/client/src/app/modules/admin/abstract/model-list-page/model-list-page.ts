import { OnInit, Injector } from '@angular/core';
import { TableColumn } from '@swimlane/ngx-datatable';
import { Observable, Subject } from 'rxjs';
import { map, tap, flatMap } from 'rxjs/operators';
import { AdminService } from '../../../../core/api';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { getComponentRouteUrl } from '../../../../shared/utils';

export abstract class ModelListPage<M> implements OnInit {
    abstract columns: TableColumn[];

    rows: M[] = [];
    page: { totalElements: number; size: number; pageNumber: number } = {
        totalElements: 0,
        size: 25,
        pageNumber: 0
    };
    loadingIndicator = false;

    createUpdateUrl = '/edit';

    protected pageSize = 25;
    protected adminService: AdminService;
    protected navController: NavController;
    protected activatedRoute: ActivatedRoute;

    constructor(injector: Injector) {
        this.adminService = injector.get(AdminService);
        this.navController = injector.get(NavController);
        this.activatedRoute = injector.get(ActivatedRoute);
    }

    ngOnInit() {
        this.onPage();
    }

    abstract getPage(page: number): Observable<{ count: number; results: M[] }>;
    abstract remove(models: M[]): Observable<void>;

    onPage(pageInfo = { offset: 0 }) {
        this.nextPage(pageInfo.offset).subscribe();
    }

    onAdd() {
        const url = getComponentRouteUrl(this.activatedRoute);
        this.navController.navigateForward(`${url}${this.createUpdateUrl}`, {
            relativeTo: this.activatedRoute
        });
    }

    onRemove(data: M[]) {
        this.loadingIndicator = true;

        this.remove(data)
            .pipe(flatMap(() => this.nextPage(this.page.pageNumber)))
            .subscribe();
    }

    private nextPage(page: number) {
        this.page.pageNumber = page;
        this.loadingIndicator = true;

        return this.getPage(this.page.pageNumber + 1).pipe(
            map(data => {
                this.page.totalElements = data.count;

                return data.results;
            }),
            tap(data => {
                this.rows = data;
                this.loadingIndicator = false;
            })
        );
    }
}
