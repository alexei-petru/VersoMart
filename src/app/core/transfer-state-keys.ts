import { StateKey, makeStateKey } from '@angular/core';
import { LanguageAppValues } from '@app/core/models/constants';

export const REQUESTED_LANGUAGE_KEY: StateKey<LanguageAppValues> =
  makeStateKey<LanguageAppValues>('REQUESTED_LANGUAGE_KEY');
