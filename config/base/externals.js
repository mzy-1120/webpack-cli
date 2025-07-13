/**
 * 排除某些依赖项不打包进最终的 bundle
 * 1、减少打包体积
 * 2、利用 CDN 资源
 * 3、避免打包大型库（如 React、jQuery、Lodash）
 * 4、在微前端架构中共享依赖
 */

/**
 * 1、基本配置
 * 键：要排除的模块名
 * 值：在运行时应该使用的全局变量名
 */
module.exports = {
  // 1.1 基本全局变量配置
  // jquery: "jQuery",
  // react: "React",
  // lodash: "_",
  // 1.2 使用不同模块系统
  // react: {
  //   root: "React", // 全局变量
  //   commonjs: "react", // CommonJS
  //   commonjs2: "react", // CommonJS2
  //   amd: "react", // AMD
  // },
  // 1.3 使用函数动态判断
  // "react-dom": function (context, request, callback) {
  //   if (request === "react-dom") {
  //     return callback(null, "ReactDOM");
  //   }
  //   callback();
  // },
};

/**
 * 2、函数形式（更灵活的控制）
 */
// module.exports = {
//   externals: [
//     function ({ context, request }, callback) {
//       // 排除所有 node_modules 中的包
//       if (/^[a-z\-0-9]+$/.test(request)) {
//         return callback(null, "commonjs " + request);
//       }
//       callback();
//     },
//     {
//       react: "React",
//       "react-dom": "ReactDOM",
//     },
//   ],
// };

/**
 * 3、函数形式（更灵活的控制）
 */
// module.exports = {
//   externals: /^(jquery|lodash)$/i,
// };

/**
 * 4、不同环境配置
 */
// module.exports = {
//   externals: [
//     {
//       // 在浏览器环境中使用全局变量
//       react: "React",
//       // 在 Node.js 环境中使用 require
//       fs: "commonjs fs",
//       path: "commonjs path",
//     },
//   ],
// };
