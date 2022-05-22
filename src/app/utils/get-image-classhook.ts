import { lastIndexOf } from 'cypress/types/lodash';

export const getImageClasshook = (imageFilename: string): string => {
  // returns image filename without hash-segment or extension
  const hashRegex = new RegExp('-([a-f,0-9]{20}|[A-F,0-9]{20})');
  const name = imageFilename.slice(0, imageFilename.lastIndexOf('.'));
  const classhook = name.replace(hashRegex, '');

  // console.info(`[utils.getImageClasshook] classhook: ${classhook}`);
  return classhook;
};
