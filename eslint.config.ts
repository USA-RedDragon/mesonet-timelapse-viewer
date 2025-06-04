import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue'
import pluginVitest from '@vitest/eslint-plugin'
import tseslint from 'typescript-eslint'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import pluginCypress from 'eslint-plugin-cypress/flat'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**', '**/reports/**']),

  js.configs.recommended,
  tseslint.configs.recommended,
  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,

  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*', 'tests/unit/**'],
  },

  {
    ...pluginCypress.configs.recommended,
    files: [
      'cypress/support/**/*.{js,ts,jsx,tsx}',
      'tests/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}',
    ],
  },
  skipFormatting,

  {
    rules: {
      'object-curly-spacing': ['error', 'always'],
      'require-jsdoc': 'off',
      indent: ['error', 2, { SwitchCase: 1 }],
      'max-len': ['error', 120],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
      ],
      'vue/multi-word-component-names': 'off',
      'valid-jsdoc': 'off',
    },
  }
)
