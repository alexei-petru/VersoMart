import { CustomTranslate } from './custom-translate.pipe';
import { AppTranslateService } from '../../services/app-translate.service';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

describe('TranslatePipe', () => {
  let pipe: CustomTranslate;
  let appTranslateService: jasmine.SpyObj<AppTranslateService>;
  let translateService: jasmine.SpyObj<TranslateService>;

  beforeEach(() => {
    appTranslateService = jasmine.createSpyObj('AppTranslateService', [], {
      translationsSub$: of({ keys: { testKey: 'testValue' } }),
    });
    translateService = jasmine.createSpyObj('TranslateService', ['get']);

    pipe = new CustomTranslate(appTranslateService, translateService);
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return translation from API if available', () => {
    const result = pipe.transform('testKey');
    result.subscribe((value) => {
      expect(value).toBe('testValue');
    });
  });

  it('should delegate to TranslateService if translation is not available from API', () => {
    translateService.get.and.returnValue(of('fallbackValue'));
    const result = pipe.transform('missingKey');
    result.subscribe((value) => {
      expect(translateService.get).toHaveBeenCalledWith('missingKey', undefined);
      expect(value).toBe('fallbackValue');
    });
  });
});
