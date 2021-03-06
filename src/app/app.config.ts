import { environment } from './../environments/environment';

export const appConfig = {
  // copy breakpoints from bootstrap's _variables.scss
  breakpoints: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
  },
  desktopBreakpoints: ['md', 'lg', 'xl'],
  dirs: {
    gifs: '/assets/images/gifs/',
    images: '/assets/images/',
    videos: '/assets/videos/',
  },
  name: 'Black Swan Archery',
};
