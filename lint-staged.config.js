module.exports = {
  '*.{js,jsx,ts,tsx,json}': (filenames) => [
    `npx @biomejs/biome check --write ${filenames.map((filename) => `"${filename}"`).join(' ')}`,
  ],
};
