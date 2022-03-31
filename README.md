# blackswanarchery

[last updated 2022-03-02]

[**WIP**: This is a brand-new project, and incomplete right now. Come back in a few months.]

Repository for Black Swan Archery's official website: [http://blackswanarchery.com/][bsa-site]

## Quick Start

1. Install **[Node 15.14.0][node-15.14.0]**.

   [Use **[NVS][nvs]** (Windows) or **[NVM][nvm]** (MacOS) to manage multiple Node versions on you machine]

1. Install [Git LFS][git-lfs].
1. Clone this repository.
1. In **Command Prompt** (Windows) or **Terminal** (MacOS), navigate into your repository root directory: `cd path/to/repo-root`
1. Install dependencies: `npm install`
1. Save template environment files as working files:
   `cd src/environments`

   On Windows:

   `copy environment.template.ts environment.ts`

   `copy environment.prod.template.ts environment.ts`

   On MacOS:

   `cp environment.template.ts environment.ts`

   `cp environment.prod.template.ts environment.ts`

1. Replace environment-files' placeholder values (e.g., `<GTM_ID>`) with real values from 3rd-party services [see details [in Project Setup wiki-page][wiki-3rd-party-services]].
1. Back out to repository root: `cd ../../`
1. Start the app:
   `npm start`

[node-15.14.0]: https://nodejs.org/download/release/v15.14.0/
[nvs]: https://github.com/jasongin/nvs
[nvm]: https://github.com/nvm-sh/nvm
[git-lfs]: https://git-lfs.github.com/
[bsa-site]: http://blackswanarchery.com/
[wiki-3rd-party-services]: https://github.com/tlei123/blackswanarchery/wiki/Setup#third-party-services
