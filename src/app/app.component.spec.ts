import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppTranslateService } from './services/app-translate.service';
import { HeaderComponent } from './core/components/header/header.component';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  template: '<div></div>',
})
class MockHeaderComponent {}

describe('AppComponent', () => {
  let appTranslateServiceMock = {
    setInitialTranslations: jasmine.createSpy('setInitialTranslations'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule],
      declarations: [AppComponent, MockHeaderComponent],
      providers: [{ provide: AppTranslateService, useValue: appTranslateServiceMock }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // ... other tests
});
