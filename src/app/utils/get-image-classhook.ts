export const getImageClasshook = (imageFilename: string): string => {
  // returns image filename without hash-segment or extension
  const hashRegex = new RegExp('-[a-z,0-9]{20}');

  return imageFilename
    .replace(hashRegex, '')
    .slice(0, imageFilename.lastIndexOf('.'));
};
