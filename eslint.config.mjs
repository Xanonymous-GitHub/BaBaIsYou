import vueEslintParser from 'vue-eslint-parser';
import typescriptEslintParser from '@typescript-eslint/parser';
import vuePlugin from 'eslint-plugin-vue';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    files: ['*.vue', '*.ts', '*.js', '*.scss'],
    languageOptions: {
      parser: vueEslintParser,
      parserOptions: {
        parser: typescriptEslintParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      vue: vuePlugin,
      '@typescript-eslint': typescriptEslintPlugin
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      // '@typescript-eslint/no-empty-function': 'warn',
      'vue/custom-event-name-casing': 'off',
      'no-use-before-define': 'error',
      '@typescript-eslint/no-use-before-define': 'error',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^h$',
          varsIgnorePattern: '^h$'
        }
      ],
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^h$',
          varsIgnorePattern: '^h$'
        }
      ],
      'space-before-function-paren': 'off',
      quotes: ['error', 'single'],
      'comma-dangle': ['error', 'never']
    },
    linterOptions: {
      reportUnusedDisableDirectives: true
    }
  },
  prettierConfig
];
