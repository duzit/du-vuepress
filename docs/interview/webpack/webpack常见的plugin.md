# plugin 

- [参考](https://mp.weixin.qq.com/s/w729tXTfgp0uXmsrJw248w)

- [webpack 中文](https://webpack.docschina.org/concepts/plugins/)

## 概念

- Plugin 是一种计算机应用程序，它和主应用程序互相交互，以提供特定的功能

- webpack 的 plugin 赋予各种灵活的功能（打包优化，资源管理， 环境变量注入等），它们会运行在 webpack 的  
  不同阶段（钩子、生命周期），贯穿整个 webpack 编译周期

## 配置方式

- 一般情况，通过配置文件导出对象中 plugins 属性传入 new 实例对象

```js
const HtmlWebpackPlugin = require('html-webpack-plugin') // 通过 npm 安装
const webpack = require('webpack') // 访问内置的插件

module.exports = {
  // ...
  plugins: [
    new webpack.ProcessPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}
```

## 特性

- 本质是一个具有 apply 方法的 js 对象

- apply 方法会被 webpack compiler 调用，并且在整个生命周期都可以访问 compiler 对象

```js
const pluginName = 'ConsoleLogOnBuildWebpackPlugin';

class ConsoleLogOnBuildWebpackPlugin {
  apply(compiler) {
    compiler.hooks.run.tap(pluginName, (compilation) => {
      console.log('webpack 构建过程开始！');
    });
  }
}

module.exports = ConsoleLogOnBuildWebpackPlugin;
```

## 常见的 Plugin

### HtmlWebpackPlugin  
- 打包结束后，自动生成一个 html 文件，并把打包生成的 js 模块引入到该 html 中

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  // ...
  plugins: [
    new HtmlWebpackPlugin({
      title: 'App',
      filename: 'index.html',
      template: './src/index.html'
    })
  ]
}
```

```html
<!--./src/index.html-->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title><%=htmlWebpackPlugin.options.title%></title>
</head>
<body>
    <h1>html-webpack-plugin</h1>
</body>
</html>
```

- 更多配置  

[参考1](https://juejin.cn/post/6844903853708541959)  
[参考2](https://github.com/jantimon/html-webpack-plugin#options)

| 属性名 | 说明      | 
| --- | ---------- | 
| title | 网页 document.title 的配置, 在index.html 文件中可以使用 <%= htmlWebpackPlugin.options.title %> 设置网页标题为这里设置的值。 |  
| filename | html 文件生成的名称，可以使用 assets/index.html 来指定生成的文件目录和文件名, 重点1:生成文件的跟路径为ouput.path的目录。 重点2: ‘assets/index.html’ 和 ./assets/index.html 这两种方式的效果时一样的， 都是在 output.path 目录下生成 assets/index.html |
| template | 生成 filename 文件的模版， 如果存在 src/index.ejs， 那么默认将会使用这个文件作为模版。 重点：与 filename 的路径不同， 当匹配模版路径的时候将会从项目的跟路径开始 | 


### clean-webpack-plugin 

- 删除构建文件

### mini-css-extract-plugin

- 提取 css 到单独文件中 

```js
plugins: [
  new MiniCssExtractPlugin({
    filename: '[name].css'
  })
]
```

### DefinePlugin 

- 允许在编译时创建配置的全局变量，是 webpack 内置的插件，不需要安装

```js
plugins: [
  new webpack.DefinePlugin({
    PRODUCTION: JSON.stringify(true),
    VERSION: JSON.stringify("5fa3b9"),
    BROWSER_SUPPORTS_HTML5: true, // 如果这个值不是字符串，它会被转化为字符串(包括函数)
    TWO: "1+1", // 2 如果这个值是一个字符串，它会被当作一个代码片段来使用
    "typeof window": JSON.stringify("object"), // 如果在一个 key 前面加了 typeof,它会被定义为 typeof 调用 , 获取的值 是 object  而不是 Xmind 会与 typeof 操作符冲突貌似
    NAME: '"hello"',
    CONFIG: JSON.stringify({ name: 'hello' }), // 如果这个值是一个对象，它所有的 key 会被同样的方式定义。
  })
]
```

### copy-webpack-plugin

- 复制文件或目录到执行区域，如 vue 打包过程，放在 public 下的文件会被复制到 dist 文件夹下

- new CopyWebpackPlugin([patterns], options)

```js
module.exports = {
  // ...
  plugins: [
    new CopyWebpackPlugin([
      {
        from: '', // 要拷贝的源文件
        to: '', // 目标文件夹
        toType: '', // file  or  dir 
        ignore: ['.*'], // 忽略的文件 
      }
    ])
  ]
}
```