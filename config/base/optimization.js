const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")
// const os = require('os')
// const threads = os.cpus().length - 1
const isProduction = process.env.NODE_ENV === "production"

// webpack优化处理
module.exports = {
  // 文件压缩
  minimizer: [
    // 压缩css
    isProduction && new CssMinimizerPlugin(),

    // 压缩js
    isProduction && new TerserPlugin({
      // include: /\/includes/,
      // exclude: /\/excludes/,
      extractComments: false, // 是否将打包后的注释保留在代码中
      // parallel: threads // 使用多进程并发运行以提高构建速度
      // 自定义压缩函数
      // minify: (file, sourceMap, minimizerOptions) => {
      //   const extractedComments = []
      //   const { map, code } = require('uglify-module').minify(file, {})
      //   return { map, code, extractedComments }
      // }
    })
  ].filter(Boolean),


  // 模块拆分：将代码拆分成多个小块（chunks），按需加载，从而减少初始加载时间
  splitChunks: {
    chunks: 'all', // 对所有类型的块进行分割
    // minSize: 10000, // 最小块大小为 10KB
    // maxSize: 0, // 最大块大小，0 表示无限制
    minChunks: 1, // 至少被引用 1 次才会被分割
    // maxAsyncRequests: 5, // 最多同时加载 5 个异步块
    // maxInitialRequests: 3, // 最多同时加载 3 个初始块
    automaticNameDelimiter: '~', // 自动生成的块名称的分隔符
    // name: true, // 是否使用自动生成的块名称

    // *** 自定义分组（两个默认的组：defaultVendors、default）
    // 1、减少重复代码：将多个模块中重复的代码提取到一个单独的 chunk 中。
    // 2、优化加载性能：将第三方库（如 React、Lodash 等）提取到一个单独的 chunk 中，减少主应用 bundle 的大小。
    // 3、按需加载：将某些模块按需加载，减少初始加载时间
    cacheGroups: {
      // 单独打包 jquery | lodash
      jquery: {
        test: /[\\/]node_modules[\\/](jquery|lodash)[\\/]/,
        name: 'libs/jquery',
        priority: 12,
        chunks: 'all', // 指定哪些类型的块可以被分割。all 表示所有类型的块都可以
        enforce: true, // 强制执行这个缓存组规则
      },
      // 打包 vue 相关的包
      vue: {
        test: /[\\/]node_modules[\\/](vue|vue-router|vuex)[\\/]/,
        name: 'libs/vue',
        chunks: 'all',
        priority: 12,
        enforce: true,
      },
      // 按照路径打包
      // home: {
      //   test: /[\\/]pages[\\/]home[\\/]/,
      //   name: 'home',
      //   chunks: 'all',
      // },
      // 打包 node_modules 下的所有包
      libs: {
        test: /[\\/]node_modules[\\/]/,
        name: 'libs/others',
        chunks: 'all',
        enforce: true,
        priority: 10,
      },
      // 默认缓存组名（merge上面默认配置）
      default: {
        minSize: 0, // 默认最小大小为 30KB
        minChunks: 2, // 最少引用两次才会被拆分
        priority: -20, //权重-20
        reuseExistingChunk: true // a -> b -> c (直接复用不抽离)
      }
    }
  },

  // 用于优化构建输出：single、multiple
  // 1、分离运行时代码：将运行时代码（runtime code）从其他代码块中分离出来，形成单独的 chunk。这样可以减少每个 chunk 的大小，提高缓存效率。
  // 2、分离运行时代码：如果多个入口点共享相同的运行时代码，使用 runtimeChunk: 'single' 可以确保这些运行时代码只生成一次，避免重复。
  // 3、提高缓存命中率：由于运行时代码通常不会经常变化，将其单独分离出来后，即使应用代码发生变化，运行时代码的哈希值也不会改变，从而提高浏览器缓存的命中率
  runtimeChunk: 'single'
}
