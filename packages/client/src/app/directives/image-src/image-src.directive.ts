import { Directive, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { environment } from '../../../environments/environment';

@Directive({
    selector: 'img[src]',
    host: {
        '[src]': 'src'
    }
})
export class ImageSrcDirective implements OnInit, OnChanges {
    @Input() src: string;

    ngOnInit() {
        this.updateSrc();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.src && !changes.src.isFirstChange()) {
            this.updateSrc();
        }
    }

    private updateSrc() {
        this.src = `${environment.host}${this.src}`;
    }
}