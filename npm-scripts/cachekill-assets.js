const { cachekill } = require('cachekill');

cachekill(
  'dist/**/*.{gif,jpg,json,png}',
  'dist/**/*.{css,html,js,json}',
  20,
  true,
)
  .then(function (result) {
    console.log('[cachekill] Fingerprinting result:', result);
    process.exitCode = 0;
  })
  .catch(function (error) {
    console.error(`[cachekill] ERROR: ${error.message}`);
    process.exitCode = 1;
  });
