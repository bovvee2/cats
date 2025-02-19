import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    rules: {
      indent: ['error', 2],
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      'comma-dangle': ['error', 'always-multiline'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'space-before-function-paren': ['error', 'always'],
      'keyword-spacing': ['error', { before: true, after: true }],
      'space-infix-ops': 'error',
      'vue/no-multi-spaces': 'error',
      'space-before-blocks': 'error',
      'no-trailing-spaces': 'error',
      'no-multiple-empty-lines': 'error',
      'no-multi-spaces': 'error',
      'no-whitespace-before-property': 'error',
      'no-var': 'error',
      'vue/no-multiple-template-root': 'off',
      // Desabilitar a regra multi-word-component-names
      'vue/multi-word-component-names': 'off',
    },
  },
  { files: ['**/*.{js,mjs,cjs,ts,vue}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'], // Configuração do Vue
  {
    // Sobrescrever a regra multi-word-component-names após aplicar as configurações do Vue
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
  { files: ['**/*.vue'], languageOptions: { parserOptions: { parser: tseslint.parser } } },
]