import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelInfoPage } from './model-info.page';

describe('ModelComponent', () => {
    let component: ModelInfoPage;
    let fixture: ComponentFixture<ModelInfoPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ModelInfoPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModelInfoPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
