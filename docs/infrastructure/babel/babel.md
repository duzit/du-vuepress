## 什么是 babel 

- babel 是一个工具链，主要用于在当前或旧的浏览器或node环境中，将ES6+代码转换为 JS 向后兼容版本的代码

### 主要做的事情

- 转换语法
- polyfill目标环境中缺少的功能
- 源代码转换
- ...

## 配置方式 

- babel.config.json 单体式仓库

```json
{
  "presets": [],
  "plugins": []
}
```

- .babelrc.json 仅适用项目的单个部分

```json
{
  "presets": [],
  "plugins": []
}
```

- package.json

```json
{
  "name": "my-pro",
  "version": "1.1.1",
  "babel": {
    "presets": [],
    "plugins": []
  }
}
```

## 运行方式和插件

- babel分为三个阶段： 解析 转换 生成

- 插件分为两种：  
  1. 语法插件  在 `解析` 这一步时 解析语法
  2. 转译插件 在 `转换` 这一步把源码转换并输出

> 同一类语法可能存在语法插件和转译插件版本，  
  如果使用了转译插件，就不用再使用语法插件了  

## preset 

- 一组插件的集合 

### 使用 

- 如果 preset 在 npm 上，可以传入 preset 名称 ， babel 将检查它是否已经安装在 node_modules 中

```json
{
  "presets": [
    "babel-preset-mypreset",
    "@babel/preset-env"
  ]
}
```

- 还可以指定 preset 的相对或绝对路径

```json
{
  "presets": [
    "./myPresets"
  ]
}
```

### 排序

- 倒序

```js
{
  "presets": ["a", "b", "c"] // 执行顺序 c, b, a
}
```

### 选项

```json
{
  "presets": [
    "a",
    ["b"],
    ["c", {}]
  ]
}

{
  "presets": [
    [
      "@babel/preset-env",
      {
        "loose": true,
        "modules": false
      }
    ]
  ]
}
```

## plugin

- 代码转换

### 使用

- 在 npm 中

```js
{
  "plugins": [
    "babel-plugin-myPlugin",
    "@babel/plugin-transform-runtime"
  ]
}

{
  "plugins": ["./myPlugin"]
}
```

### 转换类插件 

- 转译代码  
> 转换类插件将启用响应的语法类插件，所以不必两者都指定

### 语法类插件

- 大多数语法可进行转译

### 排序

- `plugin` 在 `preset` 之前运行
- `plugin` 排序是从第一个到最后一个
- `preset` 排序是颠倒的 

```json
{
  "plugins": [
    "a", 
    "b"
  ] // 执行顺序 a b 
}
```

### 选项

```json
{
  "plugins": ["pluginA", ["pluginA"], ["pluginA", {}]]
}

{
  "plugins": [
    [
      "transform-async-to-module-method",
      {
        "module": "bluebird",
        "method": "coroutine"
      }
    ]
  ]
}
```