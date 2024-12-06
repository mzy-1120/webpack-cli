// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    static: './dist', // 静态文件目录
    hot: true, // 启用热重载
    open: true, // 自动打开浏览器
    port: 3000 // 端口号
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      title: 'Webpack App',
      inject: 'body' // 资源注入位置
    })
  ],
};
