const { defineConfig } = require('eslint/config')
const expo = require('eslint-config-expo/flat')
const prettierConfig = require('eslint-config-prettier')
const prettierPlugin = require('eslint-plugin-prettier')
const simpleImportSort = require('eslint-plugin-simple-import-sort')

module.exports = defineConfig([
  expo,
  prettierConfig,
  {
    plugins: {
      prettier: prettierPlugin,
      'simple-import-sort': simpleImportSort,
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
        node: true,
      },
    },
    rules: {
      'prettier/prettier': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // React core
            ['^react$', '^react-native$'],
            // Third-party
            ['^@?\\w'],
            // Alias imports
            ['^@(constants|components|screens|services|assets|contexts|hooks|utils)/'],
            // Local relative
            ['^\\.'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
  },
  {
    ignores: ['node_modules/', '.expo/', 'dist/'],
  },
])
