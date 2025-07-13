const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const os = require("os");
const threads = os.cpus().length - 1;
const isProduction = process.env.NODE_ENV === "production";

// webpack优化处理
module.exports = {
  // 文件压缩
  minimizer: [
    // JavaScript 压缩
    isProduction &&
      new TerserPlugin({
        // include: /\/includes/,
        // exclude: /\/excludes/,
        extractComments: false, // 不提取注释
        parallel: threads, // 启用多进程
        terserOptions: {
          compress: {
            drop_console: true, // 移除 console
            pure_funcs: ["console.log"], // 只移除 console.log
          },
          format: {
            comments: false, // 移除注释
          },
        },
        // 自定义压缩函数
        // minify: (file, sourceMap, minimizerOptions) => {
        //   const extractedComments = []
        //   const { map, code } = require('uglify-module').minify(file, {})
        //   return { map, code, extractedComments }
        // }
      }),

    // css 压缩
    isProduction &&
      new CssMinimizerPlugin({
        parallel: 4, // 并行进程数
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: true },
              cssDeclarationSorter: true,
            },
          ],
        },
      }),

    // 图片压缩
    isProduction &&
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              ["svgo", { plugins: [{ removeViewBox: false }] }],
            ],
          },
        },
      }),
  ].filter(Boolean),

  /**
   * 为每个模块分配一个唯一的标识符（id）,在 Webpack 内部用于模块的引用和依赖管理
   * 1、natural：按模块引入顺序分配递增数字 ID，但依赖变动时可能导致 ID 不稳定，破坏缓
   * 2、named：使用模块路径作为可读 ID（如 src_utils_math.js），适合开发环境调试，但会增加包体积
   * 3、deterministic：生成短哈希 ID（如 3d4a），相同代码在不同构建中 ID 保持一致，是生产模式的默认值，优化长期缓存
   * 4、size：根据初始加载体积优化数字 ID，优先减少首屏资源大小
   * 5、total-size：类似 'size'，但优化目标是总体积而非仅初始加载体积
   */
  chunkIds: "natural",

  /**
   * 用于控制模块标识符(module identifiers)的生成方式。它在长期缓存策略中扮演着核心角色，直接影响构建输出的稳定性和缓存效率
   * 1、moduleIds 配置选项详解
   *    named：适用开发环境，按照模块文件路径生成，可读性强，便于调试，体积较大
   *      optimization: {
   *        moduleIds: 'named', // 使用文件路径作为ID
   *        chunkIds: 'named'   // 配套配置
   *      },
   *      output: {
   *        filename: '[name].js',
   *        chunkFilename: '[name].chunk.js'
   *      }
   *    deterministic：适用生产环境，基于模块内容的短哈希生成，内容不变则ID不变，体积小
   *      optimization: {
   *        moduleIds: 'deterministic', // 基于内容的短哈希
   *        chunkIds: 'deterministic',  // 配套配置
   *        realContentHash: true       // 基于实际内容生成hash
   *      },
   *      output: {
   *        filename: '[name].[contenthash].js',
   *        chunkFilename: '[name].[contenthash].chunk.js'
   *      }
   */
  moduleIds: "deterministic",

  /**
   * 分离 node_modules 中的第三方库（如 lodash）、多入口共享的业务代码等
   */
  splitChunks: {
    chunks: "all", // 优化所有类型 chunk: initial, async, all
    // // minSize: 30000, // 生成 chunk 的最小体积(30KB)
    // // maxSize: 0, // 0 表示无限制大
    // minChunks: 1, // 至少被引用 1 次才会被分割
    // // maxAsyncRequests: 5, // 异步按需加载的最大并行请求数
    // // maxInitialRequests: 3, // 入口点的最大并行请求数
    // enforceSizeThreshold: 50000, // 强制执行拆分的阈值
    // automaticNameDelimiter: "~", // 名称分隔符
    // // name: true, // 是否使用自动生成的块名称
    //
    // /**
    //  * 自定义分组
    //  *  1、减少重复代码：将多个模块中重复的代码提取到一个单独的 chunk 中。
    //  *  2、优化加载性能：将第三方库（如 React、Lodash 等）提取到一个单独的 chunk 中，减少主应用 bundle 的大小。
    //  *  3、按需加载：将某些模块按需加载，减少初始加载时间
    //  */
    // cacheGroups: {
    //   // 分离第三方库：jquery、lodash
    //   jquery: {
    //     test: /[\\/]node_modules[\\/](jquery|lodash)[\\/]/,
    //     name: "libs-jquery",
    //     priority: 12,
    //     chunks: "all", // 指定哪些类型的块可以被分割。all 表示所有类型的块都可以
    //     enforce: true, // 强制执行这个缓存组规则
    //   },
    //   // 打包 node_modules 下的所有包
    //   libs: {
    //     test: /[\\/]node_modules[\\/]/,
    //     name: "libs-vendor",
    //     chunks: "all",
    //     enforce: true,
    //     priority: 10,
    //   },
    // 分离公共工具函数
    // utils: {
    //   test: /[\\/]src[\\/]utils[\\/]/,
    //   name: "utils",
    //   chunks: "all",
    //   minSize: 0, // 覆盖默认minSize
    //   priority: 10,
    // },
    //   styles: {
    //     test: /\.css$/,
    //     name: "styles",
    //     chunks: "all",
    //     enforce: true,
    //   },
    //   // 默认缓存组名（merge上面默认配置）
    //   default: {
    //     minSize: 0, // 默认最小大小为 30KB
    //     minChunks: 2, // 最少引用两次才会被拆分
    //     priority: -20, //权重-20
    //     reuseExistingChunk: true, // a -> b -> c (直接复用不抽离)
    //   },
    // },
  },

  /**
   * 剥离 Webpack 的‌运行时代码‌（管理模块加载、缓存等逻辑），隔离高频变化的运行时代码
   * 1、runtimeChunk: false  禁用 runtime 分离（默认值）
   * 2、runtimeChunk: true | 'multiple'  为每个入口添加一个只含有 runtime 的额外 chunk
   * 3、runtimeChunk: 'single'  创建一个在所有生成 chunk 之间共享的运行时文件
   * 4、runtimeChunk：fn(entrypoint)=>{} 自定义 runtime 文件命名，类似于 true | 'multiple'
   * 5、作用：主要用于生产环境，避免因为运行时代码的变化导致整个 bundle 的缓存失效
   */
  runtimeChunk: "single",
};
