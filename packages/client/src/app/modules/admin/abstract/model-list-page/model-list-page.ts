import { OnInit } from '@angular/core';
import { ColumnMode, TableColumn } from '@swimlane/ngx-datatable';
import { AdminService } from '../../../../core/api';

export abstract class ModelListPage<M> implements OnInit {
    abstract columns: TableColumn[];

    rows: M[] = [];
    page: { totalElements: number; size: number; pageNumber: number } = {
        totalElements: 0,
        size: 25,
        pageNumber: 0
    };

    ColumnMode = ColumnMode;

    protected pageSize = 25;
    protected abstract adminService: AdminService;

    ngOnInit() {
        this.nextPage();
    }

    abstract getPage(page: number);

    nextPage(pageInfo = { offset: 0 }) {
        this.page.pageNumber = pageInfo.offset;
        this.getPage(this.page.pageNumber + 1).subscribe(data => {
            this.rows = [...((data.results as unknown) as M[])];

            this.page.totalElements = data.count;
        });
    }
}
