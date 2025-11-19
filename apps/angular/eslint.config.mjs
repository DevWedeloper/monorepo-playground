import angularEslintPlugin from '@angular-eslint/eslint-plugin'
import antfu from '@antfu/eslint-config'
import tsParser from '@typescript-eslint/parser'

export default antfu({
  formatters: true,
}, {
  files: ['**/*.ts'],
  languageOptions: {
    parser: tsParser,
  },
  plugins: {
    '@angular-eslint': angularEslintPlugin,
  },
  rules: {
    ...angularEslintPlugin.configs.recommended.rules,
  },
}, {
  ignores: ['.angular/**'],
})
