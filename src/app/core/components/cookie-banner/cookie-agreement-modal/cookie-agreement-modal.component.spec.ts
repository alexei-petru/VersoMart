import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookieAgreementModalComponent } from './cookie-agreement-modal.component';

describe('CookieAgreementModalComponent', () => {
  let component: CookieAgreementModalComponent;
  let fixture: ComponentFixture<CookieAgreementModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CookieAgreementModalComponent],
    });
    fixture = TestBed.createComponent(CookieAgreementModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
