import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'tfg-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    @Input() models: { name: string; singular: string; endpoint: string }[];
    @Input() selected: string;

    @Output() select = new EventEmitter<string>();

    constructor() {}

    ngOnInit() {}
}
