# typeof instanceof

- [参考链接1](https://mp.weixin.qq.com/s/6SIgXfAA8J98oQi1qEnXnA)

- [参考链接2](https://juejin.im/post/5b0b9b9051882515773ae714)

## typeof

- 基础数据类型除 `null` 外，返回对应的类型
- 引用数据类型 除 `function` 外，返回 `object`

```js
console.log(typeof 1); // number
console.log(typeof '1'); // string
console.log(typeof {}); // object
console.log(typeof []); // object
function fn() {}
console.log(typeof fn); // function
console.log(typeof null); // object 特殊
console.log(typeof Symbol()); // symbol
console.log(typeof true); // boolean
```

## instanceof

* 通过原型链判断的，A instanceof B, 在A的原型链中层层查找，是否有原型等于 `B.prototype `

```js
function new_instance_of(leftVaule, rightVaule) { 
    let rightProto = rightVaule.prototype; // 取右表达式的 prototype 值
    leftVaule = leftVaule.__proto__; // 取左表达式的__proto__值
    while (true) {
    	if (leftVaule === null) {
          return false;	
        }
        if (leftVaule === rightProto) {
          return true;	
        } 
        leftVaule = leftVaule.__proto__ 
    }
}
```

* 实现原理 只要右边变量的 prototype 在左边变量的原型链上即可。

```js
function foo() {

}
Object instanceof Object // true
Function instanceof Function // true
Function instanceof Object // true
foo instanceof foo // false
foo instanceof Object // true
foo instanceof Function // true
```
* object instanceof constructor   
  object 为实例对象 constructor 为构造函数

## 区别

1. typeof 返回变量的基本类型，instanceof 返回 boolean

2. instanceof 可以准确的判断复杂引用数据类型 不能判断基本数据类型


## 通用检测数据类型

* 通用检测数据类型 Object.prototype.toString.call()

```js
Object.prototype.toString({})       // "[object Object]"
Object.prototype.toString.call({})  // 同上结果，加上call也ok
Object.prototype.toString.call(1)    // "[object Number]"
Object.prototype.toString.call('1')  // "[object String]"
Object.prototype.toString.call(true)  // "[object Boolean]"
Object.prototype.toString.call(function(){})  // "[object Function]"
Object.prototype.toString.call(null)   //"[object Null]"
Object.prototype.toString.call(undefined) //"[object Undefined]"
Object.prototype.toString.call(/123/g)    //"[object RegExp]"
Object.prototype.toString.call(new Date()) //"[object Date]"
Object.prototype.toString.call([])       //"[object Array]"
Object.prototype.toString.call(document)  //"[object HTMLDocument]"
Object.prototype.toString.call(window)   //"[object Window]"

function getType(obj){
  let type  = typeof obj;
  if (type !== "object") {    // 先进行typeof判断，如果是基础数据类型，直接返回
    return type;
  }
  // 对于typeof返回结果是object的，再进行如下的判断，正则返回结果
  return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1'); 
}

getType([])     // "Array" typeof []是object，因此toString返回
getType('123')  // "string" typeof 直接返回
getType(window) // "Window" toString返回
getType(null)   // "Null"首字母大写，typeof null是object，需toString来判断
getType(undefined)   // "undefined" typeof 直接返回
getType()            // "undefined" typeof 直接返回
getType(function(){}) // "function" typeof能判断，因此首字母小写
getType(/123/g)      //"RegExp" toString返回
```