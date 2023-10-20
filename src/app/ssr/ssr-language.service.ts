import { Inject, Injectable, TransferState } from '@angular/core';
import { REQUESTED_LANGUAGE_KEY } from '@app/core/transfer-state-keys';
import {
  LANGUAGES_ALL_VAL_ARR,
  LANGUAGE_APP_DEFAULT,
  LanguageAppValues,
} from '@app/shared/models/constants';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';

@Injectable({
  providedIn: 'root',
})
export class SsrLanguageService {
  constructor(
    @Inject(REQUEST) private request: Request,
    private transferState: TransferState,
  ) {}

  public initiate() {
    this.setTransferStateKey();
  }

  private setTransferStateKey() {
    let requestedLanguage = LANGUAGE_APP_DEFAULT.value;
    const urlParts = this.request.url.split('/');
    const languageFragmentPos = urlParts[1];
    if (LANGUAGES_ALL_VAL_ARR.includes(languageFragmentPos)) {
      requestedLanguage = languageFragmentPos as LanguageAppValues;
    }
    this.transferState.set(REQUESTED_LANGUAGE_KEY, requestedLanguage);
  }
}
