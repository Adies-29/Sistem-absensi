import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended, // Pastikan menggunakan spread operator (...) jika perlu
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    // --- TAMBAHKAN BAGIAN RULES DI BAWAH INI ---
    rules: {
      // Mematikan error "unexpected any"
      '@typescript-eslint/no-explicit-any': 'off',
      
      // Opsional: Matikan juga peringatan jika ada variabel yang tidak terpakai (seperti dataTahunan tadi)
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
])