## Vue 编译模板原理
* https://www.jianshu.com/p/77717a3bfb17  
1. 将模板字符串转换成 element ASTs(解析器)
2. 对 AST 进行静态节点标记，主要做虚拟DOM的渲染优化（优化器）
3. 使用 element ASTs 生成 render 函数代码字符串（代码生成器）