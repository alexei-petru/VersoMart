import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RouteStateService } from '@app/services/route-state.service';
import { LanguageService } from 'src/app/services/language.service';

export const languageRedirectGuard: CanActivateFn = (route, state) => {
  const languageService = inject(LanguageService);
  const routeStateService = inject(RouteStateService);
  const router = inject(Router);
  const initialLang = languageService.getInitialLangObj().value;

  const modifiedLangUrlObj = routeStateService.getUrlWithChangedLang(state.url, initialLang);
  if (modifiedLangUrlObj.isNewUrl) {
    router.navigateByUrl(modifiedLangUrlObj.url);
    return false;
  }
  if (state.url === '/') {
    router.navigateByUrl(initialLang);
    return false;
  }
  return true;
};
