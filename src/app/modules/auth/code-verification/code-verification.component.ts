import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IMAGES_URL } from '@app/core/models/constants';
import { ApiErrorObj, ApiErrorsArr } from '@app/core/models/types';
import { getLocalFormErrorsTranslationKey } from '@app/core/utils/form/form';
import { AuthService } from '@app/services/auth.service';
import { LanguageService } from '@app/services/language.service';
import { BehaviorSubject, Subscription, finalize } from 'rxjs';

@Component({
  selector: 'app-code-verification',
  templateUrl: './code-verification.component.html',
  styleUrls: ['./code-verification.component.scss'],
})
export class CodeVerificationComponent {
  backgroundImage = IMAGES_URL.verificationPage;
  verificationCodeControl = new FormControl('', Validators.required);
  isFormLoading = false;
  getLocalErrorMessageKey = getLocalFormErrorsTranslationKey;
  private commonError = new BehaviorSubject<ApiErrorObj>({
    errorCode: undefined,
    errorData: undefined,
  });
  commonError$ = this.commonError.asObservable();
  verifyCodeSub = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router,
    private languageService: LanguageService,
  ) {}

  submitInput() {
    const verificationCode = this.verificationCodeControl.value;
    if (!verificationCode) return;

    this.isFormLoading = true;
    this.verifyCodeSub = this.authService
      .verifyCode(verificationCode)
      .pipe(
        finalize(() => {
          this.isFormLoading = false;
        }),
      )
      .subscribe({
        next: () => {
          this.router.navigateByUrl(this.languageService.getCurrentLang().value + '/auth/sign-in');
        },
        error: (errObj: HttpErrorResponse) => {
          this.setApiFormErrors(errObj);
        },
      });
  }

  private setApiFormErrors(errObj: HttpErrorResponse) {
    const errorArr: ApiErrorsArr = errObj.error;
    const lastError = errorArr ? errorArr[errorArr.length - 1] : null;
    if (lastError) {
      this.commonError.next({ errorCode: lastError.errorCode, errorData: lastError.errorData });
      this.verificationCodeControl.setErrors({ apiCommonError: true });
    }
  }
}
