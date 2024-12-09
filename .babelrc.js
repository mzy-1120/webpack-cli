/**
 * Babel 的作用
 *
 * 1、转译现代 JavaScript 语法
 *   将 ES6+ 语法（如 let、const、class、arrow functions、async/await 等）转换为 ES5 语法，
 *   确保代码在不支持新语法的环境中也能正常运行
 * 2、polyfill 支持
 *   通过 @babel/polyfill 或 core-js 和 regenerator-runtime 提供全局对象和方法的 polyfill，
 *   确保现代 JavaScript 特性在旧版浏览器中的可用性
 * 3、按需转换
 *   使用 @babel/preset-env 可以根据目标环境的特性按需转换代码，减少不必要的转换，提高性能
 */


/**
 * @babel/core 的作用 （Babel 编译器的核心库）
 *
 * 1、将 ES6+ 语法（如 let、const、class、arrow functions、async/await 等）转换为 ES5 语法
 * 2、使用 @babel/preset-env 可以根据目标环境的特性按需转换代码
 */


/**
 * babel-loader 的作用
 *
 * 1、转译现代 JavaScript 语法
 *   babel-loader 会调用 @babel/core 将 ES6+ 语法转换为 ES5 语法
 * 2、集成 Babel 配置
 *   读取项目中的 Babel 配置文件（如 .babelrc、babel.config.js），并根据配置进行转译
 */


/**
 * regenerator-runtime 的作用 （支持异步函数（async/await）的运行时库）
 *
 * 1、支持 async/await 语法
 *   提供了必要的运行时支持，使得 async/await 语法在不支持这些特性的环境中也能正常工作
 * 2、生成状态机
 *   生成一个状态机来管理 async 函数的执行过程，这个状态机负责在异步操作之间切换状态
 * 3、兼容性
 *   开发者可以在旧版浏览器或环境中使用 async/await 语法，而不用担心兼容性问题
 */


/**
 * @babel/polyfill 的作用 (为旧版浏览器或环境提供现代 js 特性的完整实现)
 *
 * 1、提供全局对象和方法
 *   为旧版浏览器添加现代 JavaScript 全局对象和方法，例如 Promise、Map、Set、Array.prototype.includes 等
 * 2、实现 ECMAScript 规范
 *   实现 ECMAScript 规范中的一些新特性
 * 3、模拟新语法
 *   模拟某些新语法特性，例如 class、let、const 等
 *   虽然这些语法特性通常由 @babel/core 转换，但 @babel/polyfill 可以确保相关的运行时行为
 * 4、提供 core-js 和 regenerator-runtime
 *   core-js：提供 ECMAScript 标准库的 polyfill
 *   regenerator-runtime：提供异步函数（async/await）的运行时支持
 * 5、变更
 *   在 babel 7.4 之前，只需要安装 @babel/polyfill
 *   从 7.4 版本开始不再更新，并且 core-js 的版本将一直使用 2.x，无法使用 core-js 3.x 中新增的补丁代码
 *   官方建议直接安装 core-js 和 regenerator-runtime 这两个包
 */


/**
 * @babel/runtime 的作用 （提供一系列辅助函数和 polyfills 的运行时库）
 *
 * 1、提供辅助函数
 *   包含了许多常用的辅助函数，如 _createClass 等。会被 Babel 插入到代码中，以支持现代 JavaScript 语法的转换
 * 2、提供 polyfills
 *   提供了一些 polyfills，用于在不支持某些现代 JavaScript 特性的环境中模拟这些特性。
 *   例如，Promise、Map、Set、Array.prototype.includes 等
 * 3、支持 async/await
 *   支持 async/await 语法在旧版浏览器中的使用
 *   regenerator-runtime 是 @babel/runtime 的一部分，用于生成状态机来管理 async 函数的执行过程
 * 4、减少代码体积
 *   通过 @babel/plugin-transform-runtime 插件，可以将这些辅助函数和 polyfills 从编译后的代码中提取出来，
 *   引用 @babel/runtime 中的相应模块，从而减少最终打包的代码体积，避免重复代码
 */


/**
 * @babel/plugin-transform-runtime 的作用 （重用 @babel/runtime 中的辅助函数和 polyfills 减少代码）
 *
 * 1、减少代码体积
 *   通过重用 @babel/runtime 中的辅助函数和 polyfills，避免在每个文件中重复生成相同的代码，从而减少最终打包的代码体积
 * 2、避免重复代码
 *   当多个文件中使用相同的辅助函数（如 _createClass 等）时，此插件会将这些辅助函数引用到 @babel/runtime 中
 * 3、提供 polyfills
 *   通过 @babel/runtime 提供的 polyfills，可以确保现代 JavaScript 特性在旧版浏览器或环境中也能正常运行
 * 4、支持 async/await
 *   通过 @babel/runtime 中的 regenerator-runtime，可以支持 async/await 语法在旧版浏览器中的使用
 */


/**
 * @babel/preset-env 的作用 （是 Babel 的一个预设集合，根据目标环境自动配置 Babel 转换规则）
 *
 * 1、按需转换
 *   根据目标环境的特性按需转换代码，只转换那些目标环境不支持的语法特性，减少不必要的转换，提高性能
 * 2、支持多种目标环境
 *   可以指定多个目标环境（如浏览器、Node.js 版本等），并根据这些环境的特性自动选择合适的转换规则
 * 3、自动引入 polyfills
 *   通过 useBuiltIns 选项，可以自动引入所需的 polyfills
 * 4、兼容性表
 *   使用 browserslist 配置来确定目标浏览器的范围，并根据这些浏览器的兼容性表自动选择转换规则
 * 5、灵活的配置选项
 *   提供了多种配置选项，允许开发者根据项目需求进行细粒度的控制
 */


/**
 * 处理 js 高级语法依赖的安装包
 * 1、@babel/core
 * 2、babel-loader
 * 3、@babel/runtime-corejs3
 * 4、"@babel/preset-env
 * 5、@babel/plugin-transform-runtime
 */


module.exports = {
  "presets": [
    [
      // 编译时起作用
      "@babel/preset-env",
      {
        "targets": {
          // 指定目标环境的范围，使用 browserslist 语法
          "browsers": ["last 2 versions", "not dead"],
          // 指定目标 Node.js 版本
          "node": "current",
          // 转化为ES6模块规范、而非require
          // esmodules: true
        },

        // 控制 polyfills 的引入方式
        // 1、false：不引入 polyfills。
        // 2、entry：在入口文件中引入所有需要的 polyfills。
        // 3、usage：按需引入 polyfills，只引入实际使用的特性所需的 polyfills。
        "useBuiltIns": "usage",

        // 指定 core-js 版本的 polyfills （编译时引入的版本）
        "corejs": 3,

        // 指定模块转换方式
        // 1、false：不转换模块
        // 2、commonjs：将 ES 模块转换为 CommonJS 模块
        // 3、amd：将 ES 模块转换为 AMD 模块
        // 4、umd：将 ES 模块转换为 UMD 模块
        // 5、systemjs：将 ES 模块转换为 SystemJS 模块
        modules: false
      }
    ]
  ],
  plugins: [
    [
      // 运行时起作用
      "@babel/plugin-transform-runtime",
      {
        // 指定 core-js 版本的 polyfills （运行时引入的版本）
        // 通过 @babel/runtime 模块按需引入 polyfills
        "corejs": 3,
        "helpers": true, // 启用辅助函数的重用
        "regenerator": true, // 启用 regenerator-runtime 的重用，支持 async/await
        "useESModules": false // 使用 CommonJS 模块语法
      }
    ]
  ]
}
