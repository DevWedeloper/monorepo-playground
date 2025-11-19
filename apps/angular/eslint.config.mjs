import angularEslintPlugin from '@angular-eslint/eslint-plugin'
import {
  combine,
  ignores,
  imports,
  javascript,
  node,
  stylistic,
  typescript,
  unicorn,
} from '@antfu/eslint-config'
import betterTailwindcssConfig from '@playground/eslint-config/better-tailwindcss'
import tsParser from '@typescript-eslint/parser'
import eslintParserAngular from 'angular-eslint'
import angularEslintTemplatePlugin from '@angular-eslint/eslint-plugin-template'

export default combine(
  ignores(),
  javascript(),
  node(),
  imports(),
  unicorn(),
  typescript(),
  stylistic(),
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      '@angular-eslint': angularEslintPlugin,
    },
    processor: eslintParserAngular.processInlineTemplates,
    rules: {
      ...angularEslintPlugin.configs.recommended.rules,
    },
  },
  {
    files: ['**/*.html'],
    languageOptions: {
      parser: eslintParserAngular.templateParser,
    },
    plugins: {
      '@angular-eslint/template': angularEslintTemplatePlugin,
    },
    rules: {
      ...angularEslintTemplatePlugin.configs.recommended.rules,
      ...angularEslintTemplatePlugin.configs.accessibility.rules,
      'style/no-trailing-spaces': 'off',
      'style/indent': 'off',
      'style/no-multiple-empty-lines': 'off',
      'style/eol-last': 'off',
      'node/no-deprecated-api': 'off',
      'node/no-path-concat': 'off',
    },
  },
  {
    ...betterTailwindcssConfig,
  },
  {
    ignores: ['.angular/**'],
  },
)
