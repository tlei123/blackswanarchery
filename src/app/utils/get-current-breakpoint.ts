import { appConfig } from './../app.config';

export const getCurrentBreakpoint = () => {
  const brkpts = appConfig.breakpoints;
  const windowWidth = window.innerWidth;
  let currBrkpt = '';

  for (const key in brkpts) {
    if (windowWidth >= brkpts[key]) {
      currBrkpt = key;
    }
  }

  return currBrkpt;
};
