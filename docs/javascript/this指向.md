### this 指向

* 函数被调用时（即运行时）才会确定该函数内this的指向。因为在函数中this与arguments是两个特殊的变量，  
  在函数被调用时才会取得它们，而且搜索这两个变量时只会在活动对象范围里面去搜
* 要确定函数中this的指向，必须先找到该函数被调用的位置。
* 始终指向最后调用它的对象

```js
// 直接不带任何引用形式去调用函数，则this会指向全局对象，因为没有其他影响去改变this，  
// this默认就是指向全局对象（浏览器是window，Node中是global）的。这个结论是在非严格模式的情况下，  
// 严格模式下这个this其实是undefined的。  
var a = 1
function test () {
  console.log(this.a)
}
test() // 1
```
-----
```js
// 谁去调用这个函数的，这个函数中的this就绑定到谁身上
var a = 1
function test () {
    console.log(this.a)
}
var obj = {
    a: 2,
    test
}
obj.test() // 2

var a = 1
function test () {
    console.log(this.a)
}
var obj = {
    a: 2,
    test
}
var obj0 = {
    a: 3,
    obj 
}
obj0.obj.test() // 2
```
---
```js
// 最后的函数调用是 testCopy
var a = 1
function test () {
    console.log(this.a)
}
var obj = {
    a: 2,
    test
}
var testCopy = obj.test
testCopy() // 1
```
-----
```js
// 改变 this 指向 
// apply call bind
// new 
// 箭头函数

var a = 1
function test () {
    console.log(this.a)
}
var obj = {
    a: 2,
    test
}
var testCopy = obj.test
testCopy.call(obj) // 2

var a = 1
function test (a) {
    this.a = a
}
var b = new test(2)
console.log(b.a) // 2

var a = 1
var test = () => {
    console.log(this.a)
}
var obj = {
    a: 2,
    test
}
obj.test() // 1
```
----

### 参考
1. https://mp.weixin.qq.com/s/_qwvmw34Hm6AZxJuIgHY6Q
