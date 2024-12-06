const pluginConfig = require("./base/plugin")
const path = require("path")
const staticConfig = require("./base/static");
const resolveConfig = require("./base/resolve");
const babelConfig = require("./base/babel");


module.exports = {
  entry: "./src/index.js",
  output: {
    // 绝对路径："dist" ==> "../dist"
    path: path.resolve(__dirname, "../dist"),

    // XXX：生成文件的名称
    // 1、hash：项目级别、2、chunkhash：入口级别、3、contenthash：文件级别
    filename: "static/js/[name].js",
    chunkFilename: "static/js/[name][contenthash:8].chunk.js", // "chunk"名称、支持动态导入 import()
    assetModuleFilename: "static/media/[contenthash:8][ext][query]", // 图片、字体等

    // 打包出来的文件中，不使用箭头函数
    environment: {
      arrowFunction: false
    },

    clean: true
  },


  // XXX：模式
  mode: process.env.NODE_ENV,


  // XXX：能检测到行、列的报错
  devtool: "source-map",


  // XXX: 使用 babel 编译模块
  module: babelConfig,


  // XXX：插件
  plugins: pluginConfig.plugins,


  // XXX：解析模块规则
  resolve: resolveConfig
}
