import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomTranslateDirective } from './custom-translate.directive';
import { AppTranslateService } from '../../services/app-translate.service';
import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

// Mock services
const mockAppTranslateService = {
  translationsSub$: {
    subscribe: jasmine.createSpy('subscribe'),
  },
};

const mockTranslateService = {
  get: jasmine.createSpy('get'),
};

// Test host component
@Component({
  template: `<div [customTranslate]="key"></div>`,
})
class TestHostComponent {
  key = 'testKey';
}

describe('CustomTranslateDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomTranslateDirective, TestHostComponent],
      providers: [
        { provide: AppTranslateService, useValue: mockAppTranslateService },
        { provide: TranslateService, useValue: mockTranslateService },
      ],
    });

    fixture = TestBed.createComponent(TestHostComponent);
  });

  it('should create an instance', () => {
    const directive = new CustomTranslateDirective(
      fixture.debugElement.query(By.css('div')).nativeElement,
      TestBed.inject(AppTranslateService),
      TestBed.inject(TranslateService)
    );
    expect(directive).toBeTruthy();
  });
});
