import antfu from '@antfu/eslint-config'
import betterTailwindcssConfig from '@playground/eslint-config/better-tailwindcss'

export default antfu({
  formatters: true,
  nextjs: true,
}, {
  ...betterTailwindcssConfig,
})
