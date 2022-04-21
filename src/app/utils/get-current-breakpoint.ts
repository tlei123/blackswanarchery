import { appConfig } from './../app.config';

export const getCurrentBreakpoint = () => {
  const brkpts = appConfig.breakpoints;
  const widthsArr = Object.keys(brkpts)
    .map((key) => brkpts[key])
    .sort((a, b) => a - b);
  const widthsArrLen = widthsArr.length;
  const windowWidth = window.innerWidth;
  let maxBpWidth = 0;
  let currBrkpt = '';

  // no need to check widthsArr[0] 'cuz value's 0
  for (let i = 1; i < widthsArrLen; i += 1) {
    if (windowWidth >= widthsArr[i]) {
      maxBpWidth = widthsArr[i];
    }
  }
  for (const key in brkpts) {
    if (brkpts[key] === maxBpWidth) {
      currBrkpt = key;
      break;
    }
  }

  return currBrkpt;
};
