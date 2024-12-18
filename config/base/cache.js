const path = require("path");
const isProduction = process.env.NODE_ENV === "production"

// XXX：缓存
module.exports = isProduction
  ? false
  : {
    type: 'filesystem', // filesystem：使用文件系统缓存、memory：使用内存缓存
    // buildDependencies: {
    //   config: [__filename], // 将 webpack 配置文件作为缓存依赖
    // },
    // version: '1', // 缓存版本，更改版本号会清除旧缓存
    name: 'development-cache', // 缓存名称
    cacheDirectory: path.resolve(__dirname, 'node_modules/.cache/webpack'),  // 缓存目录
  }