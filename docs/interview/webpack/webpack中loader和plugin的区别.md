# webpack 中loader和plugin的区别

- [参考](https://mp.weixin.qq.com/s/U5J6nCANyKx3olFTzRVr6g)

## 区别

### 概念区别

- loader 是文件加载器，能够加载一些资源文件，并对这些文件进行一些处理，诸如编译、压缩等，最终一起打包到指定的文件中 

- plugin 赋予 webpack 更多灵活的功能，如打包优化，资源管理，环境变量注入等，目的是解决 loader 无法实现的事 

### 运行时机上的区别

- loader 运行在打包文件之前

> loader 实质上是文件转换器，将 a.sass 编译转换为 b.css，单纯的文件转换

- plugins 在整个编译周期都起作用 

> 在 webpack 运行的整个生命周期会广播出很多事件，Plugin 会监听这些事件，在合适的时机通过 webpack 提供的 api 改变输出结果

