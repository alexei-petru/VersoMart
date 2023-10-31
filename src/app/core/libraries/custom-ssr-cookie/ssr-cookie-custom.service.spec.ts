// // Importing necessary modules and classes
// import { TestBed } from '@angular/core/testing';
// import { SsrCookieCustomService } from './ssr-cookie-custom.service';
// import { BehaviorSubject } from 'rxjs';
// import { DOCUMENT } from '@angular/common';
// import { PLATFORM_ID } from '@angular/core';

// // 'describe' function wraps a suite of test cases for the SsrCookieCustomService
// describe('SsrCookieCustomService', () => {
//   // Declaring variables to be used in the test cases
//   let service: SsrCookieCustomService;
//   let consent$: BehaviorSubject<boolean>;

//   // 'beforeEach' function is run before each test case
//   beforeEach(() => {
//     // Initializing the BehaviorSubject with false
//     consent$ = new BehaviorSubject<boolean>(false);

//     // Configuring testing module with necessary providers
//     TestBed.configureTestingModule({
//       providers: [
//         { provide: DOCUMENT, useValue: {} },
//         { provide: PLATFORM_ID, useValue: 'browser' },
//       ],
//     });

//     // Initializing the service
//     service = TestBed.inject(SsrCookieCustomService);

//     // Setting up the observable for cookie agreement in the service
//     service.sendCookieAgreement(consent$.asObservable());
//   });

//   // A basic test case to verify that the service is created
//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   // 'describe' block for tests related to the 'setNew' method
//   describe('setNew()', () => {
//     // Test case for checking behavior when user consent is true
//     it('should set a cookie when user consent is true', (done) => {
//       // Spying on the 'setCookie' method to check if it gets called
//       const setCookieSpy = spyOn(service as any, 'setCookie').and.callThrough();

//       // Simulating user giving consent by emitting true on the observable
//       consent$.next(true);
//       service.setNew(true, 'testName', 'testValue');

//       // Using setTimeout to wait for all pending promises and observables to complete
//       setTimeout(() => {
//         // Assertion: checking if 'setCookie' was called with the correct arguments
//         expect(setCookieSpy).toHaveBeenCalledOnceWith(
//           'testName',
//           'testValue',
//           undefined,
//           undefined,
//           undefined,
//           undefined,
//           undefined,
//         );

//         // Indicating that the asynchronous test is complete
//         done();
//       }, 0);
//     });

//     // Test case for checking behavior when user consent is false
//     it('should not set a cookie when user consent is false', (done) => {
//       // Spying on the 'setCookie' method to check if it gets called
//       const setCookieSpy = spyOn(service as any, 'setCookie').and.callThrough();

//       // Simulating user denying consent by emitting false on the observable
//       consent$.next(false);
//       service.setNew(true, 'testName', 'testValue');

//       // Using setTimeout to wait for all pending promises and observables to complete
//       setTimeout(() => {
//         // Assertion: checking if 'setCookie' was NOT called
//         expect(setCookieSpy).not.toHaveBeenCalled();

//         // Indicating that the asynchronous test is complete
//         done();
//       }, 0);
//     });

//     // Test case for checking behavior when 'isUserConsentRequire' is false
//     it('should set a cookie irrespective of user consent when isUserConsentRequire is false', () => {
//       // Spying on the 'setCookie' method to check if it gets called
//       const setCookieSpy = spyOn(service as any, 'setCookie').and.callThrough();

//       // Calling the method with 'isUserConsentRequire' set to false
//       service.setNew(false, 'testName', 'testValue');

//       // Assertion: checking if 'setCookie' was called with the correct arguments
//       expect(setCookieSpy).toHaveBeenCalledOnceWith(
//         'testName',
//         'testValue',
//         undefined,
//         undefined,
//         undefined,
//         undefined,
//         undefined,
//       );
//     });
//   });
// });
