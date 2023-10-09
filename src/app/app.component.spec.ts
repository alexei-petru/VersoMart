import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-header',
  template: '<div></div>',
})
class MockHeaderComponent {}

describe('AppComponent', () => {
  const appTranslateServiceMock = {
    setInitialTranslations: jasmine.createSpy('setInitialTranslations'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule],
      declarations: [AppComponent, MockHeaderComponent],
      providers: [{ provide: LanguageService, useValue: appTranslateServiceMock }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // ... other tests
});
