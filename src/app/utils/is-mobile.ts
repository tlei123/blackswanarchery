import { appConfig } from '../app.config';

export const isMobile = (currentBreakpoint: string): boolean => {
  return !appConfig.desktopBreakpoints.includes(currentBreakpoint);
};
