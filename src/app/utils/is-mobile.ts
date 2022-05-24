import { appConfig } from '@app/app.config';

export const isMobile = (currentBreakpoint: string): boolean => {
  return !appConfig.desktopBreakpoints.includes(currentBreakpoint);
};
