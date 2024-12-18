import globals from 'globals';
// eslint 通用规则
import pluginJs from '@eslint/js';
// TypeScript 插件规则
import eslintConfigPrettier from 'eslint-config-prettier';
// 禁用所有与 Prettier 冲突的 ESLint 规则
import pluginTypescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptEslintParser from  '@typescript-eslint/parser';


export default [
  {
    // 必须配置：否则 eslint 不检测 ts 文件
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    // 解析器和全局变量的配置
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: {
        ...globals.browser,
        // 支持 Node.js 环境
        module: 'readonly',
        process: 'readonly',
        require: 'readonly',
        __dirname: 'readonly',
      }
    },
    rules: {
      // 单引号
      quotes: ['error', 'false'],
      // 最多允许 2 行空行
      'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 0 }],
      // 声明未使用的变量只允许 React、App
      'no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^(React|App)$',
          argsIgnorePattern: '^_',
          // vars: 'all',
          // args: 'after-used',
          // ignoreRestSiblings: false,
        },
      ],
    },
  },
  {
    rules:{
      // 推荐的 JavaScript 规则
      ...pluginJs.configs.recommended.rules,
      // 推荐的 TypeScript 规则
      ...pluginTypescriptEslint.configs.recommended.rules,
      // Prettier 规则
      ...eslintConfigPrettier.rules,
    },
    plugins: {
      '@typescript-eslint': pluginTypescriptEslint,
    },
  }
];
