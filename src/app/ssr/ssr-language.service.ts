import { Inject, Injectable, Optional, PLATFORM_ID, TransferState } from '@angular/core';
import { REQUESTED_LANGUAGE_KEY } from '@app/core/transfer-state-keys';
import {
  LANGUAGES_ALL_VAL_ARR,
  LANGUAGE_APP_DEFAULT,
  LanguageAppValues,
} from '@app/core/models/constants';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';
import { isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class SsrLanguageService {
  constructor(
    private transferState: TransferState,
    @Optional() @Inject(REQUEST) private request: Request,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  public initiate() {
    this.setTransferStateKey();
  }

  private setTransferStateKey() {
    if (isPlatformServer(this.platformId) && this.request && this.request?.url) {
      let requestedLanguage = LANGUAGE_APP_DEFAULT.value;
      const urlParts = this.request.url.split('/');
      const languageFragmentPos = urlParts[1];
      if (LANGUAGES_ALL_VAL_ARR.includes(languageFragmentPos)) {
        requestedLanguage = languageFragmentPos as LanguageAppValues;
      }
      this.transferState.set(REQUESTED_LANGUAGE_KEY, requestedLanguage);
    }
  }
}
