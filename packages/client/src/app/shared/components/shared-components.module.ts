import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { InfoComponent } from './info/info.component';

const components = [InputComponent, InfoComponent];

@NgModule({
    declarations: components,
    exports: components,
    imports: [CommonModule]
})
export class SharedComponentsModule {}
