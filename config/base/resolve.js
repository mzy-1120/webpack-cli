const path = require("path");

module.exports = {
  mainFiles: ["index"], // 默认值是["index"]，意思是解析目录时，入口文件名是index
  // 自动解析确定的扩展名顺序
  extensions: [".jsx", ".ts", ".js", ".vue", ".json"],
  // 别称
  alias: {
    "@": path.resolve(__dirname, "../../src"),
  },
};
