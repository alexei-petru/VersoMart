import { StateKey, makeStateKey } from '@angular/core';
import { LanguageAppValues } from '@app/shared/models/constants';

export const REQUESTED_LANGUAGE_KEY: StateKey<LanguageAppValues> =
  makeStateKey<LanguageAppValues>('REQUESTED_LANGUAGE_KEY');
