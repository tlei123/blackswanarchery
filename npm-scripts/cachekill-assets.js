const { cachekill } = require('cachekill');

cachekill(
  'dist/**/*.{gif,jpg,json,png}',
  'dist/**/*.{css,html,js,json}',
  20,
  true,
);
