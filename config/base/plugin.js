const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const {DefinePlugin} = require('webpack');
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");


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


    // XXX：将 public 下面的资源复制到 dist 目录去（除了index.html）
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../../public"),
          to: path.resolve(__dirname, "../../dist/public"),
          toType: "dir",
          noErrorOnMissing: true, // 不生成错误
          globOptions: {
            // 忽略文件
            ignore: ["**/index.html"]
          },
          info: {
            // 跳过terser压缩js
            minimized: true
          }
        }
      ]
    }),


    /**
     * XXX：全局注入模块
     * 1、自动加载模块(如：jquery、lodash)
     *    a：默认路径，(./**) 指向 node_modules
     *    b：$('body').append('<div>Hello, World!</div>');
     * 2、自定义模块：utils: path.resolve(path.join(__dirname, 'src/module1'))
     * 3、** 如果开启 eslint，记得暴露全局变量
     */
    new webpack.ProvidePlugin({
      $: "jquery",
      _: "lodash",
      // Vue: ['vue/dist/vue.esm.js', 'default']
    }),

    // XXX：Webpack 内置插件，用户创建全局常量
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.API_URL': JSON.stringify(process.env.API_URL),
    })
  ]
}