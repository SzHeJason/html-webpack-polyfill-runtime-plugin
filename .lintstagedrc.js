module.exports = {
  '**/*.{js,jsx,ts,tsx,d.ts}': [
    'eslint --fix --cache --cache-location ./cache/eslint/',
    'git add',
  ],
  './src/**/*.{ts,d.ts}': () =>
    'tsc --noEmit --pretty',
};
