const pluginConfig = require("./base/plugin");
const path = require("path");
// const webpack = require("webpack");
const resolveConfig = require("./base/resolve");
const babelConfig = require("./base/babel");
const optimizationConfig = require("./base/optimization");
const externalsConfig = require("./base/externals");
const cacheConfig = require("./base/cache");

module.exports = {
  entry: {
    main: path.resolve(__dirname, "../src/index"),
    // another: path.resolve(__dirname, "../src/other"),
  },
  output: {
    // 绝对路径："dist" ==> "../dist"
    path: path.resolve(__dirname, "../dist"),

    /**
     * 生成文件的名称
     * 1、hash：项目级别，一个文件变化，所有的 hash 都改变
     * 2、chunkhash：chunk 级别，一个文件变化，只有当前入口下的 hash 改变
     * 3、contenthash：file 级别，只影响直接上级的 hash
     */
    // 1、，全变、2、chunkhash：入口级别、3、contenthash：文件级别
    filename: "js/[name].[contenthash:8].js",
    // chunkFilename: "chunk/[chunkhash:8].js", // "chunk"名称、支持动态导入 import()
    // assetModuleFilename: "media/[contenthash:12][ext][query]", // 图片、字体等

    // 打包出来的文件中，不使用箭头函数
    environment: {
      arrowFunction: false,
    },

    clean: true,
  },

  // 启用持久化缓存
  cache: cacheConfig,

  // XXX：模式
  mode: process.env.NODE_ENV,

  // // XXX：能检测到行、列的报错
  // devtool: "source-map",

  // XXX: 使用 babel 编译模块
  module: babelConfig,

  // // XXX：插件
  plugins: [
    // XXX: 引用已经生成的 DLL 文件，放在此处为了确保 context 的一致性
    // new webpack.DllReferencePlugin({
    //   context: __dirname,
    //   manifest: require("../dist/dll/jquery-manifest.json"),
    // }),
    // new webpack.DllReferencePlugin({
    //   context: __dirname,
    //   manifest: require("../dist/dll/lodash-manifest.json"),
    // }),

    ...pluginConfig.plugins,
  ],

  // XXX：解析模块规则
  resolve: resolveConfig,

  // XXX：库标记为外部依赖，从而避免将这些库打包到最终的 bundle 中
  externals: externalsConfig,

  // webpack 打包优化
  optimization: optimizationConfig,
};
