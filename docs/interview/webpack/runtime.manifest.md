# runtime && manifest

## runtime 
* runtime 以及伴随的 manifest 数据，是指在浏览器运行过程中，webpack 用来连接模块化应用程序所需的所有代码。  
  它包含：在模块交互时，连接模块所需的加载和解析逻辑，以及，已经加载到浏览器中的连接模块逻辑，和尚未加载模块的延迟加载逻辑。

## manifest 
* 当 compiler 开始执行，解析和映射应用程序时，它会保留所有模块的详细要点。这个数据集合被称为‘manifest’，当完成打包并发送到浏览器时，  
  runtime 会通过 manifest 来解析和加载模块。import 和 require 语句被转换为 __webpack_require__ 方法，此方法指向模块标识符(module identifier)，  
  通过使用 manifest 中的数据， runtime 能够解锁这些标识符，找出每个标识符对应的模块。
