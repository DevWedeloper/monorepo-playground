import antfu from '@antfu/eslint-config'
import tsParser from '@typescript-eslint/parser'
import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss'
import svelteParser from 'svelte-eslint-parser'

export default antfu({
  formatters: true,
  react: true,
  svelte: true,
  files: ['**/*.ts', '**/*.tsx', '**/*.jsx', '**/*.svelte'],
  languageOptions: {
    parser: tsParser,
    overrides: [
      {
        files: ['**/*.svelte'],
        parser: svelteParser,
      },
    ],
  },
  plugins: {
    'better-tailwindcss': eslintPluginBetterTailwindcss,
  },
  rules: {
    'no-undef': 'off',
    ...eslintPluginBetterTailwindcss.configs['recommended-warn'].rules,
    ...eslintPluginBetterTailwindcss.configs['recommended-error'].rules,
    'better-tailwindcss/enforce-consistent-line-wrapping': 'off',
    'better-tailwindcss/no-unregistered-classes': 'off',
  },
  ignores: ['**/.angular/**'],
})
