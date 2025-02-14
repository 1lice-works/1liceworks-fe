import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'simple-import-sort/imports': 'error', // import 정렬
      'simple-import-sort/exports': 'error', // export 정렬
      'no-unused-vars': 'off', // 기본 규칙 비활성화
      '@typescript-eslint/no-unused-vars': 'off', // TypeScript의 미사용 변수 규칙 비활성화
      'unused-imports/no-unused-imports': 'error', // 미사용 import 제거
      'unused-imports/no-unused-vars': 'error',
      'react/react-in-jsx-scope': 'off', // React 17+ JSX 트랜스폼 설정
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  }
);
