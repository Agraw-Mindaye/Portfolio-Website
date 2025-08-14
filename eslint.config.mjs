import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

import prettier from 'eslint-config-prettier'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  {
    name: 'custom-rules',
    rules: {
      'react/no-unescaped-entities': 'off',
    },
  },

  {
    name: 'prettier',
    rules: {
      ...prettier.rules,
    },
  },
]



export default eslintConfig
