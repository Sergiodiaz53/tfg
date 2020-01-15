import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorationPage } from './valoration.page';

describe('ValorationPage', () => {
    let component: ValorationPage;
    let fixture: ComponentFixture<ValorationPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ValorationPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ValorationPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
