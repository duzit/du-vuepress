# webpack常见的loader 及 解决了什么问题

- [参考](https://mp.weixin.qq.com/s/UrIH72bYufUxCoXs54QqlQ)

- [webpack 中文](https://webpack.docschina.org/concepts/loaders/)

## 概念

- loader 用于对模块源代码进行转化，在 import 或 加载 模块时预处理文件  
  webpack 做的事仅仅时分析出模块的依赖关系，然后形成资源列表，最终打包生成到指定文件中。  
  默认情况下，在遇到 import 或 required 加载模块时，webpack 只会对 js 和 json 文件打包，  
  像 css img sass 这类文件，webpack 则无能为力，这时候就需要配置对应的 loader 解析文件内容。
  当遇到 webpack 不能识别的文件模块时，webpack 会在配置中查找文件解析规则。

## 配置 loader 的几种方式
 
1. 配置方式，在 webpack.config.js 中指定 loader
2. 内联方式，在每个 import 语句中显示配置 loader 
3. CLI方式，在 Shell 命令中指定 loader

### webpack.config.js 

- module.rules 允许配置多个 loader

- 执行顺序 从右至左或从下到上， 如下 css 配置，先执行 sass-loader 然后 css-loader 最后 style-loader 

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  }
}
```

### 内联方式 

- 可以在 import 语句中指定 loader，使用 ！将loader资源分开

```js
import Styles from 'style-loader!css-loader?modules!./styles.css'
```
- 通过 内联 import 语句添加前缀，可以覆盖 webpack.config.js 配置的 loader preloader postloader

```js
// ! 前缀 忽略 normal loader 
import Styles from '!style-loader!css-loader?modules!./styles.css'

// !! 前缀 忽略所有 loader preloader postloader 
import Styles from '!style-loader!css-loader?modules!./styles.css'

// -! 前缀 忽略 loader preloader 不忽略 postloader 
import Styles from '-!style-loader!css-loader?modules!./styles.css'
```

> Tips  
  rule.enforce 可以配置 'pre' 'post' 默认 normal 

## 特性

- loader 支持链式调用  
  按照相反的顺序执行（从右至左或从下到上）

- 可以同步 也可以异步 

> 同步，分 单个处理结果和多个处理结果(必须使用 this.callback())  

```js
// 单个处理结果
module.exports = function (content, map, meta) {
  return someSyncOperation(content);
};

// 多个
module.exports = function (content, map, meta) {
  this.callback(null, someSyncOperation(content), map, meta);
  return; // 当调用 callback() 函数时，总是返回 undefined
};
```

> 异步，使用 this.async 获取callback函数  
  
```js
module.exports = function (content, map, meta) {
  var callback = this.async();
  someAsyncOperation(content, function (err, result) {
    if (err) return callback(err);
    callback(null, result, map, meta);
  });
};

module.exports = function (content, map, meta) {
  var callback = this.async();
  someAsyncOperation(content, function (err, result, sourceMaps, meta) {
    if (err) return callback(err);
    callback(null, result, sourceMaps, meta);
  });
};
```

- 运行在 Node.js 中，并且能够执行操作

- 可以通过 options 配置

- 能够产生额外的任意文件

## 常见 loader

- style-loader  
  将 css 添加到 DOM 的内联样式标签style上

- css-loader  
  允许通过require引入css文件，并返回css内容  

- less-loader 

- sass-loader 

- postcss-loader 使用 postcss 处理 css，用 JavaScript 工具和插件转换 css 的工具

- file-loader 分发文件到 output 路径并返回文件路径 

- url-loader 类似 file-loader ，当文件小于设定的 limit 时 返回 data url 

- babel-loader 转换ES6 至 ES5 