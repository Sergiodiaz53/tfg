import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ColumnMode, TableColumn, SelectionType } from '@swimlane/ngx-datatable';

@Component({
    selector: 'tfg-model-list',
    templateUrl: './model-list.component.html',
    styleUrls: ['./model-list.component.scss']
})
export class ModelListComponent implements OnInit {
    @Input() rows: any[];
    @Input() columns: TableColumn[];
    @Input() page: number;
    @Input() pageSize: number;
    @Input() count: number;
    @Input() loadingIndicator: boolean;

    @Output() pageChange = new EventEmitter<number>();
    @Output() remove = new EventEmitter<any[]>();
    @Output() add = new EventEmitter<void>();

    ColumnMode = ColumnMode;
    SelectionType = SelectionType;

    selected: any[] = [];

    constructor() {}

    ngOnInit() {
        this.addCheckbox();
    }

    onSelect(data: { selected: any[] }) {
        this.selected = data.selected;
    }

    onRemove() {
        this.remove.emit(this.selected);

        this.selected = [];
    }

    private addCheckbox() {
        this.columns = [
            {
                width: 30,
                sortable: false,
                canAutoResize: false,
                draggable: false,
                resizeable: false,
                headerCheckboxable: true,
                checkboxable: true
            },
            ...this.columns
        ];
    }
}
