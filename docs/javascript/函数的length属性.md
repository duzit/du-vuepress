### 函数的length属性
```js
(() => 1).length === 0; // 输出什么
```
* 函数的length属性就是函数的参数个数
```js
(() => 1).length === 0; // 输出 true
(a => a).length; // 输出 1
```