const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = [
  {
    mode: "production",
    entry: {
      lodash: ["lodash"],
    },
    output: {
      path: path.resolve(__dirname, "../dist/dll"),
      filename: "[name].dll.js", // 输出的 DLL 文件名
      library: "[name]_library", // 导出为 global 变量，供 DllReferencePlugin 使用
    },
    plugins: [
      new webpack.DllPlugin({
        name: "[name]_library", // 必须与 output.library 一致
        path: path.join(__dirname, "../dist/dll", "[name]-manifest.json"), // 清单文件输出路径
        context: __dirname, // 必须与引用 DLL 的 Webpack 配置中的 context 一致
      }),
    ],
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          extractComments: false, // 是否将打包后的注释保留在代码中
        }),
      ],
    },
  },
  {
    mode: "production",
    entry: {
      jquery: ["jquery"],
    },
    output: {
      path: path.resolve(__dirname, "../dist/dll"),
      filename: "[name].dll.js", // 输出的 DLL 文件名
      library: "[name]_library", // 导出为 global 变量，供 DllReferencePlugin 使用
    },
    plugins: [
      new webpack.DllPlugin({
        name: "[name]_library", // 必须与 output.library 一致
        path: path.join(__dirname, "../dist/dll", "[name]-manifest.json"), // 清单文件输出路径
        context: __dirname, // 必须与引用 DLL 的 Webpack 配置中的 context 一致
      }),
    ],
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          extractComments: false, // 是否将打包后的注释保留在代码中
        }),
      ],
    },
  },
];
