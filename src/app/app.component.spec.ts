// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { AppComponent } from './app.component';
// import { Renderer2 } from '@angular/core';
// import { LanguageService } from './services/language.service';
// import { SidenavService } from './services/sidenav.service';
// import { ThemeService } from './services/styling/theme.service';
// import { CookieAppService } from './services/cookie-app.service';
// import { of } from 'rxjs';
// import { MatSidenav } from '@angular/material/sidenav';

// describe('AppComponent', () => {
//   let component: AppComponent;
//   let fixture: ComponentFixture<AppComponent>;
//   let mockRenderer: jasmine.SpyObj<Renderer2>;
//   let mockLanguageService: jasmine.SpyObj<LanguageService>;
//   let mockSidenavService: jasmine.SpyObj<SidenavService>;
//   let mockThemeService: jasmine.SpyObj<ThemeService>;
//   let mockCookieAppService: jasmine.SpyObj<CookieAppService>;

//   beforeEach(() => {
//     mockRenderer = jasmine.createSpyObj('Renderer2', ['setAttribute']);
//     mockLanguageService = jasmine.createSpyObj('LanguageService', ['initLang']);
//     mockSidenavService = jasmine.createSpyObj('SidenavService', ['setSidenav']);
//     mockThemeService = jasmine.createSpyObj('ThemeService', ['setDefaultTheme']);
//     mockCookieAppService = jasmine.createSpyObj('CookieAppService', [''], {
//       isCookieDisplayed$: of(false),
//     });

//     TestBed.configureTestingModule({
//       declarations: [AppComponent],
//       providers: [
//         { provide: Renderer2, useValue: mockRenderer },
//         { provide: LanguageService, useValue: mockLanguageService },
//         { provide: SidenavService, useValue: mockSidenavService },
//         { provide: ThemeService, useValue: mockThemeService },
//         { provide: CookieAppService, useValue: mockCookieAppService },
//       ],
//     });

//     fixture = TestBed.createComponent(AppComponent);
//     component = fixture.componentInstance;
//   });

//   it('should call initLang() and setDefaultTheme() on component initialization', () => {
//     expect(mockLanguageService.initLang).toHaveBeenCalled();
//     expect(mockThemeService.setDefaultTheme).toHaveBeenCalled();
//   });

//   it('should call setSidenav() on view initialization', () => {
//     component.ngAfterViewInit();
//     expect(mockSidenavService.setSidenav).toHaveBeenCalled();
//   });

//   // Add more test cases
// });
