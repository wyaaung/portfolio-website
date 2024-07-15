module.exports = {
  '*.{ts,tsx}': (filenames) => [
    `npx eslint --fix ${filenames.map((filename) => `"${filename}"`).join(' ')}`,
  ],
};
