import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageSrcDirective } from './image-src/image-src.directive';

@NgModule({
    declarations: [ImageSrcDirective],
    imports: [ CommonModule ],
    exports: [ImageSrcDirective],
    providers: [],
})
export class CommonDirectivesModule {}