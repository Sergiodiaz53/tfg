import { Component, OnInit, Input } from '@angular/core';
import { HistoryStats } from '../../../../core/api';
import { ChartConfiguration } from 'chart.js';

@Component({
    selector: 'app-history-stats',
    templateUrl: 'history-stats.component.html',
    styleUrls: ['history-stats.component.scss']
})
export class HistoryStatsComponent implements OnInit {
    @Input()
    stats: HistoryStats[];

    xAxisLabel: Date[] = [];
    chartConfiguration: ChartConfiguration = {
        type: 'bar',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Correct Answers',
                    data: [],
                    backgroundColor: 'rgba(54, 162, 235, 0.2)'
                },
                {
                    label: 'Average Valoration',
                    data: [],
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    type: 'line',
                    yAxisID: 'valoration',
                    fill: false,
                    lineTension: 0
                }
            ]
        },
        options: {
            scales: {
                xAxes: [],
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true
                        }
                    },
                    {
                        id: 'valoration',
                        ticks: {
                            beginAtZero: true,
                            max: 1,
                            stepSize: 0.01
                        },
                        display: false
                    }
                ]
            }
        }
    };

    constructor() {}

    ngOnInit() {
        this.update();
    }

    private update() {
        this.updateXAxisLabel();
        this.updateCorrectAnswerStats();
        this.updateValorationStats();
    }

    private updateXAxisLabel() {
        this.chartConfiguration.data.labels = this.stats.map(({ day, correctAnswers, ...rest }) =>
            day.toLocaleString()
        );
    }

    private updateCorrectAnswerStats() {
        this.chartConfiguration.data.datasets[0].data = this.stats.map(
            ({ correctAnswers, ...rest }) => correctAnswers
        );
    }

    private updateValorationStats() {
        this.chartConfiguration.data.datasets[1].data = this.stats.map(
            ({ valoration, ...rest }) => valoration
        );
    }
}
