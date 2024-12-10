const serverConfig = require("./base/server")
const pluginConfig = require("./base/plugin")
const resolveConfig = require("./base/resolve");
const babelConfig = require("./base/babel");
const path = require("path");


module.exports = {
  // 入口使用 相对路径：在虚拟内存中运行与src并排 (并非相对于当前目录)
  entry: () => {
    return "./src/index"
  },

  output: {
    // 开发环境下没有输出文件
    // path: path.resolve(__dirname, "../dist"),

    // XXX：生成文件的名称
    // 1、hash：项目级别、2、chunkhash：入口级别、3、contenthash：文件级别
    filename: "static/js/[name].js",
    chunkFilename: "static/js/[name][contenthash:8].chunk.js", // "chunk"名称、支持动态导入 import()
    assetModuleFilename: "static/media/[contenthash:8][ext][query]", // 图片、字体等

    // webpack4 中使用 new CleanWebpackPlugin()
    // webpack5 中直接配置 clear
    clean: true
  },


  // XXX：模式
  mode: process.env.NODE_ENV,


  // XXX：能检测到行的报错
  // 1、内联 source-map
  //    a、eval：较小
  //       开发环境默认值，eval包裹每个module模块
  //       sourceURL指向源文件地址
  //       可以定位到行、列，与原文件不同（bundle中直接展开地址内容）
  //    b、eval-source-map：较大
  //       通过eval函数执行
  //       sourceMap 通过base64编码后添加到了 "eval函数" 中
  //       可以定位到行、列，与原文件相同
  //    c、inline-source-map：较大
  //       可以定位到行、列，与原文件相同
  //       source map 通过base64编码后添加到了文件最 "尾处"
  // 2、外联
  //    a、cheap-source-map：只精确到行，对于有loader的情况，会不够准确
  //    b、cheap-module-source-map：只精确到行，可以很好的处理有loader的情况
  // 3、外联（不显示源码）
  //    a、hidden-source-map：
  //       生成一个SourceMap文件
  //       但是bundle中没有引用（手动引入）
  //    b、nosources-source-map
  //       会生成source map
  //       生成的source map只有错误信息的提示，不会生成源代码文件
  //       会在控制台告诉错误的内容及文件，但是点击文件名的时候看不到源码
  devtool: "cheap-module-source-map",


  // XXX：开发服务器：webpack-dev-server（内存中）
  devServer: serverConfig,


  // XXX: 使用 babel 编译模块
  module: babelConfig,


  // XXX：使用插件
  plugins: pluginConfig.plugins,


  // XXX：解析模块规则
  resolve: resolveConfig
}
