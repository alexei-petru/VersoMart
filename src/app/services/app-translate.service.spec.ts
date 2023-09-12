import { TestBed } from '@angular/core/testing';
import { AppTranslateService } from './app-translate.service';
import { ApiService } from './api.service';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { DEFAULT_LANGUAGE, LANGUAGES } from '../shared/constants';

describe('AppTranslateService', () => {
  let service: AppTranslateService;
  let apiServiceMock: jasmine.SpyObj<ApiService>;
  let translateServiceMock: jasmine.SpyObj<TranslateService>;

  beforeEach(() => {
    apiServiceMock = jasmine.createSpyObj('ApiService', ['getLangTranslations']);
    translateServiceMock = jasmine.createSpyObj('TranslateService', [
      'addLangs',
      'setDefaultLang',
      'getBrowserLang',
      'use',
    ]);

    TestBed.configureTestingModule({
      providers: [
        AppTranslateService,
        { provide: ApiService, useValue: apiServiceMock },
        { provide: TranslateService, useValue: translateServiceMock },
      ],
    });

    service = TestBed.inject(AppTranslateService);
    translateServiceMock.getBrowserLang.and.returnValue('en');
    apiServiceMock.getLangTranslations.and.returnValue(of({ lang: 'en', keys: { key: 'value' } }));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setInitialTranslations', () => {
    it('should initialize translations using the default language', () => {
      service.setInitialTranslations();

      expect(translateServiceMock.addLangs).toHaveBeenCalledWith([...LANGUAGES]);
      expect(translateServiceMock.setDefaultLang).toHaveBeenCalledWith(DEFAULT_LANGUAGE);
      expect(translateServiceMock.use).toHaveBeenCalled();
      expect(apiServiceMock.getLangTranslations).toHaveBeenCalledWith(DEFAULT_LANGUAGE);
    });
  });

  describe('changeTranslations', () => {
    it('should set translations for the specified language', () => {
      const lang = 'de';
      service.changeTranslations(lang);

      expect(translateServiceMock.use).toHaveBeenCalledWith(lang);
      expect(apiServiceMock.getLangTranslations).toHaveBeenCalledWith(lang);
    });
  });
});
