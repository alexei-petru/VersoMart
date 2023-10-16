import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LanguageService } from 'src/app/services/language.service';

export const homeRedirectGuard: CanActivateFn = () => {
  const languageService = inject(LanguageService);
  const router = inject(Router);
  const initialLang = languageService.getInitialLang().value;
  if (initialLang) {
    router.navigateByUrl(initialLang);
    return false;
  }
  return true;
};
