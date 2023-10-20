import { TestBed } from '@angular/core/testing';

import { CookieAppService } from './cookie-app.service';

describe('CookieBannerService', () => {
  let service: CookieAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookieAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
