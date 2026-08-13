import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import pluginOxlint from 'eslint-plugin-oxlint'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default defineConfig([
  { name: 'app/files-to-lint', files: ['**/*.{vue,js,mjs,jsx}'] }, // ① 검사 대상
  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']), // ② 제외 폴더
  { languageOptions: { globals: { ...globals.browser } } }, // ③ 브라우저 전역
  js.configs.recommended, // ④ 표준 추천 규칙
  ...pluginVue.configs['flat/essential'],
  ...pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json'), // ⑤ 초고속 린터 동기화
  skipFormatting, // ⑥ 서식은 Prettier 에 위임
])
