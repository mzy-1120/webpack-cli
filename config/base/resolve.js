const path = require("path")

// XXX；解析模块规则
module.exports = {
  mainFiles: ["index"], // 默认值是["index"]，意思是解析目录时，入口文件名是index
  // 自动解析确定的扩展名顺序
  extensions: ['.ts', '.js', '.vue', '.jsx', '.json'],
  // 别称
  alias: {
    "@": path.resolve(__dirname, '../../src'),
  }
}