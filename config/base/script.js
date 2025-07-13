const path = require("path");
const os = require("os");
const threads = os.cpus().length - 1;
const isProduction = process.env.NODE_ENV === "production";

const getScriptLoaders = (pre) => {
  return [
    // 开启多线程
    // {
    //   loader: "thread-loader", // 开启多线程
    //   options: {
    //     works: threads, // 线程数量，CPU核心数减1
    //     workerParallelJobs: 50, // 每个 worker 并行任务数
    //     poolTimeout: isProduction ? Infinity : 2000, // 开发环境: 保持线程池常驻、生产环境: 构建完成后关闭线程池
    //     poolRespawn: false, // 禁用自动重启
    //     name: "js-pool", // 线程池名称
    //     workerNodeArgs: ["--max-old-space-size=2048"], // 限制 worker 内存，解决内存泄漏
    //   },
    // },

    {
      loader: "babel-loader",
      options: {
        include: path.resolve(__dirname, "../../src"),
        exclude: /node_modules/,
        cacheDirectory: true, // 开启babel缓存(默认缓存路径：node_modules/.catch...)
        cacheCompression: false, // 关闭缓存文件压缩
      },
    },

    // 接受、处理传入的loader(如：ts-loader)
    pre,

    // 1、webpack4中使用loader 2、webpack5中使用plugin
    // {
    //   loader: 'eslint-loader',
    //   enforce: "pre",
    //   include: [path.resolve(__dirname, 'src')], // 指定检查的目录
    //   options: { // 自动合并 eslintrc.js
    //     ...
    //   }
    // }
  ].filter(Boolean);
};

module.exports = {
  script: [
    // 处理js、jsx文件
    {
      test: /\.js$|\.jsx$/,
      use: getScriptLoaders(),
    },

    // 处理ts文件
    {
      test: /\.ts$|\.tsx$/,
      use: getScriptLoaders("ts-loader"),
    },

    // 给某个某块提供 window 对象
    // {
    //   test: require.resolve('../../src/index.js'),
    //   use: 'imports-loader?wrapper=window'
    // },
  ],
};
