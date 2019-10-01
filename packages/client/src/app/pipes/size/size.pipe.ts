import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'size',
    pure: true
})
export class SizePipe implements PipeTransform {
    transform(value: any[]): any {
        return value.length;
    }
}
