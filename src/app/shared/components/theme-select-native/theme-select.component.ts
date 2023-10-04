// import { Component, Renderer2 } from '@angular/core';
// import { ThemeService } from 'src/app/services/styling/theme.service';
// import { ThemeAppValues } from '../../constants';

// @Component({
//   selector: 'app-theme-select-native',
//   templateUrl: './theme-select.component.html',
//   styleUrls: ['./theme-select.component.scss'],
// })
// export class ThemeSelectNativeComponent {
//   currentTheme$ = this.themeService.currentTheme$;
//   themesAllAppArray$ = this.themeService.themesAllAppArray$;

//   constructor(
//     private themeService: ThemeService,
//     private renderer: Renderer2,
//   ) {
//     this.currentTheme$.subscribe((res) => {
//       console.log(
//         '\x1b[35m%s\x1b[0m',
//         `theme-select.component H10:40 L20: 'currentTheme res'`,
//         res,
//       );
//     });
//     this.themesAllAppArray$.subscribe((res) => {
//       console.log(
//         '\x1b[35m%s\x1b[0m',
//         `theme-select.component H10:40 L20: 'themesAllAppArray res'`,
//         res,
//       );
//     });
//   }

//   setTheme(themeSelectValue: ThemeAppValues): void {
//     this.themeService.setTheme(themeSelectValue, this.renderer);
//   }
// }
