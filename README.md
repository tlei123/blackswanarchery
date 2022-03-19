# blackswanarchery

[last updated 2022-03-02]

[**WIP**: This is a brand-new project, and incomplete right now. Come back in a few months.]

Repository for Black Swan Archery's official website: [http://blackswanarchery.com/][bsa-site]

## Quick Start

1. Install [Node 15.14.0][node-15.14.0].
    [use [NVS][nvs] (Windows) or [NVM][nvm] (MacOS) to manage multiple Node versions on you machine]
1. Install [Git LFS][git-lfs].
1. Clone this repository.
1. In Command Prompt (Windows) or Terminal (MacOS), navigate into your repository root directory:
    `cd path/to/repo-root`
1. Install dependencies: `npm install`
1. Save template environment files as working files:
    `cd src/environments`
    On Windows:
    `copy environment.template.ts environment.ts`
    `copy environment.prod.template.ts environment.ts`
    On MacOS:
    `cp environment.template.ts environment.ts`
    `cp environment.prod.template.ts environment.ts`
1. Start the app:
    `npm start`

---

# Generated with Angular-CLI

[Below is boilerplate-content generated from Angular-CLI at project creation.]

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.18.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

[node-15.14.0]: https://nodejs.org/download/release/v15.14.0/
[nvs]: https://github.com/jasongin/nvs
[nvm]: https://github.com/nvm-sh/nvm
[git-lfs]: https://git-lfs.github.com/
[bsa-site]: http://blackswanarchery.com/
