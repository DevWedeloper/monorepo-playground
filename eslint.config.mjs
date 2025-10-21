import antfu from '@antfu/eslint-config'
import tsParser from '@typescript-eslint/parser'
import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss'

export default antfu({
  formatters: true,
  react: true,
}, {
  files: ['**/*.ts', '**/*.tsx', '**/*.jsx'],
  languageOptions: {
    parser: tsParser,
  },
  rules: {
    'no-undef': 'off',
  },
}, {
  plugins: {
    'better-tailwindcss': eslintPluginBetterTailwindcss,
  },
  rules: {
    ...eslintPluginBetterTailwindcss.configs['recommended-warn'].rules,
    ...eslintPluginBetterTailwindcss.configs['recommended-error'].rules,
    'better-tailwindcss/enforce-consistent-line-wrapping': ['off'],
    'better-tailwindcss/no-unregistered-classes': ['off'],
  },
}, {
  ignores: ['**/.angular/**'],
})
