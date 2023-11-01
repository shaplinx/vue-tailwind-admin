import { genesisIcons } from '@formkit/icons'
import { generateClasses } from '@formkit/themes'
import {themes} from './tailwind-formkit-theme.ts'
import { type DefaultConfigOptions, defaultConfig } from '@formkit/vue'

const config :DefaultConfigOptions = defaultConfig({
  config: {
    // pass our theme object to generateClasses
    classes: generateClasses(themes),
  },
  icons: {
    // include supporting icons from @formkit/icons
    ...genesisIcons,
  },
})

export default config