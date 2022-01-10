# this 指向

* 函数被调用时（即运行时）才会确定该函数内this的指向。因为在函数中this与arguments是两个特殊的变量，  
  在函数被调用时才会取得它们，而且搜索这两个变量时只会在活动对象范围里面去搜
* 要确定函数中this的指向，必须先找到该函数被调用的位置。
* 始终指向最后调用它的对象

## 绑定规则 

### 默认绑定 

```js
// 直接不带任何引用形式去调用函数，则this会指向全局对象，因为没有其他影响去改变this，  
// this默认就是指向全局对象（浏览器是window，Node中是global）的。这个结论是在非严格模式的情况下，  
// 严格模式下这个this其实是undefined的。  
var a = 1
function test () {
  console.log(this.a)
}
// test 是 window 调用的 
test() // 1
```

### 隐式绑定

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

// obj 调用 则绑定在 obj 上  this.a === obj.a 
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
// 嵌套调用 以最后调用为准 绑定在 obj 而不是 obj0 
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

// 这里只是赋值 并没有调用 
var testCopy = obj.test
// 真正调用的地方 是 window 
testCopy() // 1
```

### new 绑定 

- new 改变 this 指向 

```js
funtion Test() {
    this.x = 1
}

const obj = new Test()
// new 改变 this 指向 
obj.x // 1 
```

- new 过程遇到 return 一个对象， 此时 this 指向返回的对象

```js
function Test() {
  this.x = 1
  return {
    x: 2
  }
}

const obj = new Test()
obj.x // 2
```

- 如果返回一个简单的类型 则指向该实例  
  虽然 null 也是对象，但 this 依然指向该实例

```js
function Test() {
  this.x = 1
  return 'hello' || null
}

const obj = new Test()
obj.x // 1
```

### 显示修改指向 apply call bind

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
// 指定 obj 为 this 指向 
testCopy.call(obj) // 2

var a = 1
function test (a) {
    this.a = a
}
var b = new test(2)
console.log(b.a) // 2
```

### 箭头函数 

- this 始终指向 函数定义时 的this ，并非执行时

- 箭头函数中没有this绑定，必须通过查找其作用域链来决定其值

- 如果箭头函数被非箭头函数包含，则 this 绑定的是 最近一层非箭头函数的 this ，否则 this 为 undefined 

```js
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

```js
var name = "windowsName";

var a = {
    name : "Cherry",

    func1: function () {
        console.log(this.name)     
    },

    func2: function () {
        setTimeout( () => {
            this.func1()
        },100);
    }

};

a.func2()     // Cherry
```

### 优先级
 
- new绑定优先级 > 显示绑定优先级 > 隐式绑定优先级 > 默认绑定优先级

## 改变 this 指向的方法

- 箭头函数

- new

- apply call bind

- 函数内部使用 _that = this

## 参考

- [说说你对Javascript中this对象的理解](https://mp.weixin.qq.com/s/_qwvmw34Hm6AZxJuIgHY6Q)

- [掘金](https://juejin.cn/post/6844903496253177863)
