import globals from "globals";
// eslint 通用规则
import js from "@eslint/js";
// Typescript 解析器
import tsParser from "@typescript-eslint/parser";
// TypeScript 插件规则
import tsPlugin from "@typescript-eslint/eslint-plugin";
// 将 Prettier 的格式化规则转换为 ESLint 规则
// 1、启用 prettier/prettier 规则
// 2、禁用此插件有问题的 arrow-body-style 和 prefer-arrow-callback 规则
// 3、启用 eslint-config-prettier 配置，这将关闭与 Prettier 冲突的 ESLint 规则
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
  {
    // 必须配置：否则 eslint 不检测 ts 文件
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx", "**/*.mjs"],
    // 解析器和全局变量的配置
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        parser: tsParser, // 使用 TypeScript 的解析器
        ecmaVersion: "latest", // 支持最新 ECMAScript 版本
        sourceType: "module", // 使用 ES 模块
        // project: "./tsconfig.json",
      },
      globals: {
        ...globals.browser,
        // 支持 Node.js 环境
        module: "readonly",
        process: "readonly",
        require: "readonly",
        __dirname: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin, // typeScript 插件规则
    },
    rules: {
      // eslint 通用规则
      ...js.configs.recommended.rules,
      // TypeScript 规则
      ...tsPlugin.configs.recommended.rules,
      // TODO: 同步 prettier 的配置, 否则会报错
      "prettier/prettier": [
        "error",
        {
          singleQuote: false,
        },
      ],
      quotes: ["error", "double"], // 单引号
      "@typescript-eslint/no-require-imports": "off",
      // TODO: 不起作用，可能是 Prettier 内部的固定为 1
      "no-multiple-empty-lines": ["error", { max: 4, maxEOF: 0 }], // 最多允许 2 行空行
      // 声明未使用的变量只允许 React、App
      "@typescript-eslint/no-unused-vars": [
        "error",
        { varsIgnorePattern: "^(React|App)$", argsIgnorePattern: "^_" },
      ],
      "no-unused-vars": [
        "error",
        { varsIgnorePattern: "^(React|App)$", argsIgnorePattern: "^_" },
      ],
    },
  },

  // XXX: 必须放最后
  // 将 Prettier 的格式化规则转换为 ESLint 规则
  eslintPluginPrettierRecommended,
];
