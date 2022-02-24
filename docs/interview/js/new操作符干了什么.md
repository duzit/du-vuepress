# new 操作符做了什么

1. 创建一个空对象

2. 继承构造函数的原型  Foo.prototype 

3. 改变 this 指向 属性和方法 都被加入到 this 引用的对象中 

4. 如果源构造函数有返回值，则处理返回值  

> 如果返回值是基本数据类型 则返回空对象  
  如果是引用类型 则返回构造函数的返回

```js
// 1 创建一个空对象
// 构造函数 Foo 
function Fn1() {
  
}

const n1 = new Fn1();
console.log(n1); // Fn1 {}
// 1 end

// 2 继承构造函数的原型  Foo.prototype 
console.log(n1.__proto__ === Fn1.prototype); // true 
// 2 end

// 3 改变 this 指向 属性和方法 都被加入到 this 引用的对象中 
function fn2() {
  this.name = 'hello'
}
const n2 = new fn2()
console.log(n2.name); // hello
// 3 end

// 4 如果源构造函数有返回值，则处理返回值
// 如果返回值是基本数据类型 则返回空对象
// 如果是引用类型 则返回构造函数的返回
function fn3() {
  return 'jack'
}

const n3 = new fn3()
console.log(n3); // fn3 {}

function fn4() {
  return { name: 'hello'}
}

const n4 = new fn4()
console.log(n4); // {name: 'hello'}
```