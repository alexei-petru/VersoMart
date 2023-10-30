import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnActionComponent } from './btn-action.component';

describe('BtnActionComponent', () => {
  let component: BtnActionComponent;
  let fixture: ComponentFixture<BtnActionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BtnActionComponent],
    });
    fixture = TestBed.createComponent(BtnActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
