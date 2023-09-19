# VersoMart

This project uses and modifies 'Euphoria,' a Figma template available in the Figma Community designed by Jhanvi Shah, which is licensed under the Creative Commons Attribution 4.0 International License (CC BY 4.0). You can see the original template here https://www.figma.com/community/file/1250348068101895773/Euphoria---Ecommerce-(Apparels)-Website-Template and the full license here https://creativecommons.org/licenses/by/4.0/.
Modifications to the original template have been made for this project.A big thank you to the author for making this available.

This project uses the server from [pararell_eshop_mean](https://github.com/pararell/eshop_mean).A big thank you to the author for making this available.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

--- For Development ---

## TO Do

- `High priority`
- header buttons login and register path construct incorect children path incorrect
- configure prettier and linters
- add eslint no-unused-vars

- `Low priorty`
- Chech translation performance from merging local and api.

## Deployment notes

- assets folder remove from git-ignore or resolve
- add enviroment variables

## Docs

- `Translations dependecy`: ngx-translate depends on translate-router, changing route lang will change translation
- `hydration err` Some components may not work properly with hydration enabled due to some of the aforementioned issues, like Direct DOM Manipulation. As a workaround, you can add the ngSkipHydration attribute to a component's tag in order to skip hydrating the entire component.
  "<example-cmp ngSkipHydration />"
- `hydration err` the server dom and client dom need to be the same
  ex. mutating the dom direcctly in client will be diferent from the server dom, resulting in a DOM mismatch error
- `stylelint`: vs code recommended extension [stylelint.vscode-stylelint], also it is necessary sometimes
  to change in editor settings , "stylelint.validate": ["css", "scss"], in order for extension to work
