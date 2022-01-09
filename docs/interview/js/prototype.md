# 原型(链)

- [参考](https://juejin.im/post/5c72a1766fb9a049ea3993e6)

## 实例 

```js
var A = function() {};
A.prototype.n = 1;
var b = new A();
A.prototype = {
  n: 2,
  m: 3
}
var c = new A();

console.log(b.n); // 1
console.log(b.m); // undefined

console.log(c.n); // 2
console.log(c.m); // 3
```
----
```js
var F = function() {};

Object.prototype.a = function() {
  console.log('a');
};

Function.prototype.b = function() {
  console.log('b');
}

var f = new F();

f.a(); // a
f.b(); // error f.b is not a function

F.a(); // a
F.b(); // b
```
---
```js
var foo = {},
    F = function(){};
Object.prototype.a = 'value a';
Function.prototype.b = 'value b';

console.log(foo.a); // value a
console.log(foo.b); // undefined

console.log(F.a); // value a
console.log(F.b); // value b
```
---
```js
function Person(name) {
    this.name = name
}
let p = new Person('Tom');

// p.__proto__等于什么？ // Person.prototype
// Person.__proto__等于什么？ // Function.prototype
```
---
```js
// 对比
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.eat = function() {
    console.log(age + "岁的" + name + "在吃饭。");
  }
}

let p1 = new Person("jsliang", 24);
let p2 = new Person("jsliang", 24);

console.log(p1.eat === p2.eat); // false

function Person(name) {
  this.name = name;
}

// 通过构造函数的 Person 的 prototype 属性找到 Person 的原型对象
Person.prototype.eat = function() {
  console.log("吃饭");
}

let p1 = new Person("jsliang", 24);
let p2 = new Person("梁峻荣", 24);

console.log(p1.eat === p2.eat); // true
```
---
```js
Object.__proto__ === Function.prototype;
Function.prototype.__proto__ === Object.prototype;
Object.prototype.__proto__ === null;
```
## new 缺点

* 无法共享属性和方法
## prototype 

* 数据共享，避免资源浪费
## 原型链

* 通过两种创建原型的方式（ Object.create() 或 DOG.prototype ）生成一个 __proto__   
  指针来实现
* 作用  
  > 访问 优先在对象本身查找，没有则顺着原型链向上查找  
  > 修改 只能修改跟删除自身属性，不会影响到原型链上的其他对象。

## 说明

* JavaScript只有一种结构：对象。  
  每个实例对象都有一个私有属性（__proto__）指向它的构造函数的原型对象（prototype），  
  该原型对象也有一个自己的原型对象（__proto__），层层向上直到一个对象的原型对象为null，  
  根据定义，null是没有原型的，并作为这个原型链中的最后一个环节。  
  几乎所有JavaScript中的对象都是位于原型链顶端的Object实例。
* JavaScript有一个指向一个原型对象的链，当试图访问对象的属性时，它不仅仅在该对象上搜寻，  
  还会搜寻该对象的原型，以及该对象的原型的原型，一次层层向上搜索，直到找到一个名字匹配的  
  属性或到达原型链的末尾。

![prototype](../assets/prototype.png)