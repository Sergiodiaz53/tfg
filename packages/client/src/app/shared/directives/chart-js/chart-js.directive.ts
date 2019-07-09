import { Directive, ElementRef, OnInit, Input } from '@angular/core';

import { Chart, ChartConfiguration } from 'chart.js';

@Directive({ selector: 'canvas[appChart]' })
export class ChartDirective implements OnInit {
    @Input()
    appChart: ChartConfiguration = {};

    private chart: Chart;

    constructor(private elementRef: ElementRef<HTMLCanvasElement>) {}

    ngOnInit() {
        this.update();
    }

    private update() {
        const ctx = this.elementRef.nativeElement.getContext('2d');
        this.chart = new Chart(ctx, this.appChart);

        this.chart.update();
    }
}
