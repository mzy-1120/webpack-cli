const path = require("path");
const isProduction = process.env.NODE_ENV === "production";

/**
 * 1、 webpack5 启用持久化缓存
 */
module.exports = isProduction
  ? false
  : {
      type: "filesystem", // filesystem：使用文件系统缓存、memory：使用内存缓存

      // 可选配置项
      cacheDirectory: path.resolve(__dirname, "node_modules/.cache/webpack"), // 缓存目录
      buildDependencies: {
        // config: [__filename], // 配置文件的依赖项，当这些文件变化时缓存失效
      },
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1周，自动清理
      maxSize: 500 * 1024 * 1024, // 500MB，自动清理
      version: "1", // 缓存版本，更新依赖时更改
      name: "development-cache", // 不同环境使用不同缓存名称
    };

// ***************** 扩展 *****************
// 持久化缓存结合 optimization、output 配置
// optimization: {
//   moduleIds: 'deterministic', // 保持模块ID稳定
//   chunkIds: 'deterministic', // 保持chunkID稳定
//   runtimeChunk: 'single', // 提取runtime代码
// },
// output: {
//   filename: '[name].[contenthash].js', // 使用内容哈希
//   path: path.resolve(__dirname, 'dist'),
// }

/**
 * 2、 webpack4 启用持久化缓存，需要使用第三方插件实现持久化缓存
 */
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
// const path = require('path');
//
// module.exports = {
//   plugins: [
//     // 添加持久化缓存插件
//     new HardSourceWebpackPlugin({
//       cacheDirectory: path.resolve(__dirname, '.cache/hard-source/[confighash]'),
//       configHash: function(webpackConfig) {
//         // 根据配置生成哈希，配置变化时缓存失效
//         return require('node-object-hash')({sort: false}).hash(webpackConfig);
//       },
//       environmentHash: {
//         root: process.cwd(),
//         directories: [],
//         files: ['package-lock.json', 'yarn.lock'],
//       },
//     }),
//
//     // 添加缓存清理插件（可选）
//     new (require('clean-webpack-plugin').CleanWebpackPlugin)(),
//   ],
//
//   optimization: {
//     moduleIds: 'hashed', // 保持模块ID稳定
//     runtimeChunk: 'single',
//     splitChunks: {
//       chunks: 'all',
//     },
//   },
//
//   output: {
//     filename: '[name].[contenthash].js',
//     path: path.resolve(__dirname, 'dist'),
//   }
// };

/**
 * 3、 缓存策略最佳实践
 */
// 3.1 内容哈希命名
// output: {
//   filename: '[name].[contenthash:8].js', // 8位哈希值
//   chunkFilename: '[name].[contenthash:8].chunk.js',
// }

// 3.2 提取稳定模块
// optimization: {
//   splitChunks: {
//     cacheGroups: {
//       vendor: {
//         test: /[\\/]node_modules[\\/]/,
//           name: 'vendors',
//           chunks: 'all',
//       },
//     },
//   },
// }

// 3.3 环境特定配置
// 根据环境设置不同缓存名称
// const isProduction = process.env.NODE_ENV === "production";
// module.exports = {
//   cache: {
//     type: "filesystem",
//     name: isProduction ? "prod-cache" : "dev-cache",
//     version: isProduction ? "v1.2" : "dev",
//   },
// };

// 3.4 配置清理脚本
// {
//   "scripts": {
//     "clean": "rm -rf .webpack_cache dist",
//     "build": "npm run clean && webpack"
//   }
// }
