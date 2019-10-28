import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
    selector: 'tfg-model-create',
    templateUrl: './model-create.component.html',
    styleUrls: ['./model-create.component.scss']
})
export class ModelCreateComponent implements OnInit, OnChanges {
    @Input() fields: FormlyFieldConfig[];
    @Input() model = {};
    @Input() errors: any = {};

    @Output() create = new EventEmitter<any>();

    form: FormGroup;

    constructor() {}

    ngOnInit() {
        this.model = this.model || {};
        this.form = new FormGroup({});

        this.fields = this.fields.map(field => {
            return { ...field, ...{ validation: { show: true } } };
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.errors && !changes.errors.isFirstChange()) {
            this.updateModelErrors();
        }
    }

    onSubmit() {
        this.create.emit(this.model);
    }

    private updateModelErrors() {
        Object.entries(this.form.controls).forEach(([name, control]) => {
            if (this.errors[name]) {
                control.setErrors({ other: this.errors[name] });
            }
        });
    }
}
