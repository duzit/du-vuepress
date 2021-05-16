
### null 和 undefined 的区别
* typeof(null) typeof(undefined)
```js 
typeof(null) // 'object'
typeof(undefined) // 'undefined'
```
#### undefined 
1. 定义了但未赋值
2. 函数未传参
3. 函数默认返回值
```js 
let num;
console.log(num); // undefined

function name(params) {
  console.log(params); // undefined
}
name()

function name1(params) {
  return
}
name1() // undefined
```

#### undeclared 
*js语法错误，没有声明直接使用，js无法找到对应的上下文

#### null 
1. 表示没有对象，此处不应该有值
2. 原型链的终点

## typeof null === 'object'
* 在js最初的实现中，js中的值是由一个表示类型的标签和实际数据值表示的，对象（object）的类型标签是0。  
  由于null代表空指针（大多数平台下的值为0x00），因此，null的类型标签是0。
* JavaScript 在底层存储变量的时候，会在变量的机器码的低位 1-3位存储其类型信息
1. 000 对象
2. 010 浮点数
3. 100 字符串
4. 110 布尔
5. 1 整数
* 最好使用 typeof 判断基本数据类型(除了 null)，避免对 null 的判断
* 对变量比较准确的判断 使用 Object.prototype.toString.call()