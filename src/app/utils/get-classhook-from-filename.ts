export const getClasshookFromFilename = (filename: string): string => {
  // returns just the original filename
  // [minus hash-segment (cachebusting) & file-extension]
  const hashRegex = new RegExp('/-([a-f,d]{20}|[A-F,d]{20})/');

  return filename.replace(hashRegex, '').slice(0, filename.lastIndexOf('.'));
};
