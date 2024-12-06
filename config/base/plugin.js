const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const {DefinePlugin} = require('webpack');


module.exports = {
  plugins: [
    // XXX：webpack4 中清除文件
    // new CleanWebpackPlugin(),

    // XXX：利用html模版动态引入webpack打好的包
    new HtmlWebpackPlugin({
      // 开发环境下修改："public/index.html" ==> "../public/index.html"
      template: path.resolve(__dirname, "../../public/index.html"),
      // inject: "head" // script 标签插入的位置
      // filename: '**/index.html' // 自定义html名称(路径)
      // chunks: [], // 根据多入口，可手动导入要使用的chunk
      // publicPath:'' // 给script、style添加公共路径
    }),

    // XXX：Webpack 内置插件，用户创建全局常量
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.API_URL': JSON.stringify(process.env.API_URL),
    })
  ]
}