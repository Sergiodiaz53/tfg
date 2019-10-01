import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SizePipe } from './size/size.pipe';

@NgModule({
    imports: [CommonModule],
    declarations: [SizePipe],
    exports: [SizePipe]
})
export class PipesModule {}
