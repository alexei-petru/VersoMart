import { TestBed } from '@angular/core/testing';

import { SsrLanguageService } from './ssr-language.service';

describe('SsrLanguageService', () => {
  let service: SsrLanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SsrLanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
