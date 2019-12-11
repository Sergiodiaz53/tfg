import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
    selector: 'tfg-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputComponent),
            multi: true
        }
    ]
})
export class InputComponent implements OnInit, ControlValueAccessor {
    @Input() placeholder: string;

    value = '';
    isDisabled = false;
    onChange: (_: any) => {};
    onTouch = () => {};

    constructor() {}

    ngOnInit() {}

    onInput(value: string) {
        this.value = value;
        this.onTouch();
        this.onChange(value);
    }

    writeValue(value: any) {
        if (value) {
            this.value = value || '';
        } else {
            this.value = '';
        }
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouch = fn;
    }

    setDisabledState(isDisabled: boolean) {
        this.isDisabled = isDisabled;
    }
}
