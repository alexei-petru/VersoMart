# VersoMart

- `Note`
  This project is an eshop app that is still in early development. Many features are not finished. It uses feature like angular-universal, ngx-translate, angular-material and more.

- `Design`
  This project uses and modifies 'Euphoria,' a Figma template available in the Figma Community designed by Jhanvi Shah, which is licensed under the Creative Commons Attribution 4.0 International License (CC BY 4.0). You can see the original template here https://www.figma.com/community/file/1250348068101895773/Euphoria---Ecommerce-(Apparels)-Website-Template and the full license here https://creativecommons.org/licenses/by/4.0/.
  Modifications to the original template have been made for this project.A big thank you to the author for making this available.

## Demo

https://versomart.vercel.app/en/auth/sign-up

## Angular cli

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.1.

### Development server

Run `npm start` for a ssr dev server. Navigate to `http://localhost:5600/`. The application will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Deploy

add `npm run deploy` to hosting service to deploy.

---

## DOCS

### TO Do

- `High priority`
  - fix social buttons
  - fix performance and seo
  - fix home auth text
  - add preview/demo banner
  - implement router-reuse for lang
- `Low priorty`
  - add auto theme switch from device

### Deployment notes

- assets folder remove from git-ignore or resolve
- add enviroment variables
- Change @angular material imports if necesarry
  @use "@angular/material" as mat;
  @use "/node_modules/@angular/material" as mat;
- add more languages
- `envirnoment`
  - environment.ts will be replaced with environment.prod.ts in production by angular config
  - in-memory-web-api when realDB remove by setting environment.prod.ts/useInMemoryWebApi to false

### Notes Useful

- `Styling`

  - `size`: 1rem = 10px
  - `stylelint`: vs code recommended extension [stylelint.vscode-stylelint], also it is necessary sometimes
    to change in editor settings , "stylelint.validate": ["css", "scss"], in order for extension to work.

- `Translations`


- `Hydration`

  - `hydration err`: Some components may not work properly with hydration enabled due to some of the aforementioned issues, like Direct DOM Manipulation. As a workaround, you can add the ngSkipHydration attribute to a component's tag in order to skip hydrating the entire component.
    "<example-cmp ngSkipHydration />"
  - `hydration err` the server dom and client dom need to be the same
    ex. mutating the dom direcctly in client will be diferent from the server dom, resulting in a DOM mismatch error

- `SsrCookieService`

  - use SsrCookieCustomService instead because its a wrapper around SsrCookieService, and
    it has adition methods and cofiguration, first of all its set based on the user agreement.

- `in-memory-web-api`
  - its used by default even in prod
  - it will intercept all http and interact if specific endpoint found
