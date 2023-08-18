import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  getLang$(): Observable<string> {
    return of('en');
  }

  constructor() {}
}
