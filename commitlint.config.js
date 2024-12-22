module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // 提交类型必须是枚举值之一
    "type-enum": [
      2,
      "always",
      [
        "build",
        "chore",
        "ci",
        "docs",
        "feat",
        "fix",
        "perf",
        "refactor",
        "revert",
        "style",
        "test",
      ],
    ],
    // 提交类型必须是小写
    "type-case": [2, "always", "lower-case"],
    // 提交类型不能为空
    "type-empty": [2, "never"],
    // 作用域必须是小写
    "scope-case": [2, "always", "lower-case"],
    // 提交消息的描述部分不能以句号结尾
    "subject-full-stop": [2, "never", "."],
    // 提交消息的描述部分必须以小写字母开头
    "subject-case": [
      2,
      "never",
      ["sentence-case", "start-case", "pascal-case", "upper-case"],
    ],
    // 提交消息的第一行长度不能超过 72 个字符
    "header-max-length": [2, "always", 72],
    // 提交消息的主体部分每行长度不能超过 100 个字符
    "body-max-line-length": [2, "always", 100],
    // 提交消息的底部部分每行长度不能超过 100 个字符
    "footer-max-line-length": [2, "always", 100],
    // 提交消息的底部部分必须与主体部分之间有一行空行
    "footer-leading-blank": [2, "always"],
    // 提交消息的主体部分必须与描述部分之间有一行空行
    "body-leading-blank": [2, "always"],
  },
};
