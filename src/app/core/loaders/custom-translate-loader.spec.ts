import { CommonModule } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';
import { CustomTranslateLoader } from './custom-translate-loader';
import { SnackbarData } from 'src/app/shared/models';
import { environment } from 'src/environments/environment';

describe('CustomTranslateLoader', () => {
  let loader: CustomTranslateLoader;
  let httpMock: HttpTestingController;
  let apiService: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule, NoopAnimationsModule, CommonModule],
      providers: [CustomTranslateLoader, ApiService, TranslateLoader, MatSnackBar],
      declarations: [SnackBarComponent],
    });

    loader = TestBed.inject(CustomTranslateLoader);
    httpMock = TestBed.inject(HttpTestingController);
    apiService = TestBed.inject(ApiService);
  });

  afterEach(() => {
    httpMock.verify();
  });
  it('should create', () => {
    expect(loader).toBeTruthy();
  });

  it('should merge API and local translations if they are different,api overwrite the local translation', () => {
    const mockApiTranslation = {
      lang: 'en',
      keys: {
        title: 'title from API',
        header: {
          login: 'login from API',
        },
      },
    };
    const mockLocalTranslation = {
      title: 'title from local',
      header: {
        login: 'Login from Local',
        registration: 'Registration from Local',
      },
    };
    const expectedOutput = {
      title: 'title from API',
      header: {
        login: 'login from API',
        registration: 'Registration from Local',
      },
    };

    spyOn(apiService, 'getLangTranslations').and.returnValue(of(mockApiTranslation));

    loader.getTranslation('en').subscribe({
      next: (translationKeys) => {
        expect(translationKeys).toEqual(expectedOutput);
      },

      error: (err) => {
        fail('Should not error');
      },
    });

    const req = httpMock.expectOne(`${environment.ssrUrl}/assets/i18n/en.json`);
    expect(req.request.method).toBe('GET');
    req.flush(mockLocalTranslation);
  });

  it('should fall to local translation if server error', () => {
    const mockLocalTranslation = {
      title: 'title from local',
      header: {
        login: 'Login from Local',
        registration: 'Registration from Local',
      },
    };

    spyOn(apiService, 'getLangTranslations').and.returnValue(throwError(() => new Error('error')));

    loader.getTranslation('en').subscribe({
      next: (translationKeys) => {
        expect(translationKeys).toEqual(mockLocalTranslation);
      },
      error: () => {
        fail('Should not have error callback invoked');
      },
    });

    const req = httpMock.expectOne(`${environment.ssrUrl}/assets/i18n/en.json`);
    expect(req.request.method).toBe('GET');
    req.flush(mockLocalTranslation);
  });
  it('should display a snackbar when server error occurs', () => {
    const mockLocalTranslation = {
      title: 'title from local',
      header: {
        login: 'Login from Local',
        registration: 'Registration from Local',
      },
    };

    spyOn(apiService, 'getLangTranslations').and.returnValue(throwError('Server Error'));

    const snackBar: MatSnackBar = TestBed.inject(MatSnackBar);
    const snackbarSpy = spyOn(snackBar, 'openFromComponent');

    loader.getTranslation('en').subscribe({
      next: (translationKeys) => {
        expect(translationKeys).toEqual(mockLocalTranslation);
      },
      error: () => {
        fail('Should not have error callback invoked');
      },
    });

    const req = httpMock.expectOne(`${environment.ssrUrl}/assets/i18n/en.json`);
    expect(req.request.method).toBe('GET');
    req.flush(mockLocalTranslation);

    expect(snackbarSpy).toHaveBeenCalledWith(SnackBarComponent, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      data: { message: 'Translation Server Error,Used local translation' } as SnackbarData,
    });
  });
});
