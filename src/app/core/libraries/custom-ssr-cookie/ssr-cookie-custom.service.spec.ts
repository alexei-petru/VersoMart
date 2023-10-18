import { TestBed } from '@angular/core/testing';
import { SsrCookieCustomService } from './ssr-cookie-custom.service';

describe('CustomSsrCookieServiceService', () => {
  let service: SsrCookieCustomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SsrCookieCustomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
