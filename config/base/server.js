const path = require("path");
module.exports = {
  host: "localhost", // 0.0.0.0 同局域网内可以被访问到
  port: process.env.PORT,
  open: true, // 自动打开浏览器
  static: {
    // 允许 html 文件引入 dist 下的静态资源
    directory: path.join(__dirname, "../../dist"),
  },
  /**
   * 模块热更新(默认为true)
   * 1、hot为false
   *    a、css、js的 '任何改动'，重新打包整个项目
   *    b、浏览器自动刷新整个项目
   * 2、hot为true
   *    a、改动 css，会实现"热更新"(style-loader：会实现局部更新)
   *    b、改动 js 依然会重新打包整个项目，浏览器自动刷新整个项目
   *    c、手动实现"热更新"：
   *       const render = () => { ReactDOM.render(<App />, document.getElementById('root')); };
   *       render();
   *       if (module.hot) { module.hot.accept('./App', render); }
   *    d、热更新插件
   *       vue：
   *          vue-loader：处理vue项目热更新
   *       react：
   *          react-hot-loader：旧插件
   *          @pmmmwh/react-refresh-webpack-plugin react-refresh：最新插件
   * 3、webpack4中还需要使用 new webpack.HotModuleReplacementPlugin() 插件
   */
  hot: true,

  // XXX：主要用于在开发环境中处理 HTML5 History API 的路由。
  //  1、当使用单页应用框架（如 React Router、Vue Router）时，路由通常是基于 URL 的路径，而不是传统的带有 # 的锚点（例如 /#!/about）。
  //  2、当用户直接访问这些路径时，服务器需要返回一个 HTML 文件（通常是 index.html），而不是返回 404 错误。
  // historyApiFallback: true,
  // historyApiFallback: {
  //   rewrites: [
  //     { from: /^\/subpage/, to: '/views/subpage.html' }, // 访问 /subpage 开头的路径会被重定向到 subpage.html
  //     { from: /./, to: '/views/404.html' } // 其他所有路径会被重定向到 index.html
  //   ]
  // },
  historyApiFallback: true, // 解决history路由页面刷新404问题

  // XXX：配置https
  // https: true,
  // https: {
  //   minVersion: 'TLSv1.1',
  //   key: fs.readFileSync(path.join(__dirname, './server.key')),
  //   pfx: fs.readFileSync(path.join(__dirname, './server.pfx')),
  //   cert: fs.readFileSync(path.join(__dirname, './server.crt')),
  //   ca: fs.readFileSync(path.join(__dirname, './ca.pem')),
  //   passphrase: 'webpack-dev-server',
  //   requestCert: true
  // },

  // XXX：设置请求头
  // headers: {
  //   'X-Custom-Foo': 'bar'
  // },

  // 拦截接口
  // before: function (app) {
  //   // 直接自己造数据，不访问后端接口
  //   app.get('/api/user', function (req, res) {
  //     // 请求成功返回数据
  //     res.json({ app: 'app', name: 'before' })
  //   })
  // },

  // // 代理
  // proxy: [
  //   {
  //     context: ['/api'],
  //     changeOrigin: true,
  //     target: process.env.API_URL,
  //     pathRewrite: { '^/api': '' },
  //   },
  // ],
};
