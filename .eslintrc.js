module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    commonjs: true,
  },
  extends: [
    'eslint:recommended',
  ],
  "parserOptions": {
    "ecmaVersion": 2018
  },
  overrides: [{
    files: ['**/*.ts'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: './tsconfig.json',
    },
    extends: [
      'plugin:@typescript-eslint/recommended'
    ],
    plugins: ['@typescript-eslint'],
  }]
};