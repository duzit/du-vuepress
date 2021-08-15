# Class 类

## 生成实例对象的传统方法 是使用构造函数

```js
// 生成实例对象的传统方法 是使用构造函数
function Foo(x, y, name = 'hello') {
  this.x = x;
  this.y = y;
  this.name = name;

  this.getInfo = () => {
    return this.name;
  }
}

// 箭头函数 this 指向 window 
// name = 'Ben';
Foo.prototype.getName = () => {
  return `name: ${this.name}`;
}

Foo.prototype.toString = function() {
  return `x: ${this.x}; y: ${this.y}`;
}

const foo = new Foo(1, 2, 'Moto');

console.log(foo.x); // 1
console.log(foo.y); // 2
// function 普通函数 this 指向该实例
console.log(foo.toString()); // x: 1; y: 2
```

## `class` 关键字定义类

```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // 不需要使用 function 定义方法
  toString() {
    return `x: ${this.x}; y: ${this.y}`;
  }
}

// ES6 类是另一种构造函数的写法
// 类的基本数据类型是函数 
console.log(typeof Point); // 'function'
// 类本身指向构造函数
console.log(Point === Point.prototype.constructor); // true

// 使用 class 时用 new 关键字 跟构造函数一样

const point = new Point(100, 200);
const str = point.toString();
console.log(str); // x: 100; y: 200
```

- 构造函数的 `prototype` 在 ES6 上继续存在
  > 事实上，类的所有方法都是定义在类的 `prototype` 属性上

```js
class Point {
  constructor {}

  toString() {}
}

// 等于
Point.prototype = {
  constructor() {}

  toString() {}
}

console.log(Point.prototype); // {constructor: ƒ, toString: ƒ}
```

- 在类的实例上调用方法，实际上就是在调用类的原型上的方法

```js
class Bar {

}
const b = new Bar();
b.constructor === Bar.prototype.constructor // true
```

- 类内部定义的所有方法, 都是不可枚举的, 跟 ES5 不一致

```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // 不需要使用 function 定义方法
  toString() {
    return `x: ${this.x}; y: ${this.y}`;
  }
}

const keys = Object.keys(Point.prototype);
console.log(keys); // []
console.log(Object.getOwnPropertyNames(Point.prototype)); // ["constructor", "toString"]

console.log(Object.keys(Foo.prototype)); // ["getName", "toString"]
console.log(Object.getOwnPropertyNames(Foo.prototype)); // ["constructor", "getName", "toString"]
```

- 类必须使用 `new` 调用，否则会报错，普通构造函数不使用 `new` 也可以，不会报错。

## constructor 方法

- 是类的默认方法，通过 `new` 命令生成对象实例时，默认调用该方法。一个类必须有 `constructor` 方法，  
  如果没有显示定义，会被默认添加
- 默认返回实例对象 （this），也可以指定返回一个对象 
```js
constructor() {
  return Object.create(null);
}
```

## 类的实例 

- 与 ES5 一样，实例的属性除非显示定义在其本身（this），否则都是定义在原型上（class）

```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // 不需要使用 function 定义方法
  toString() {
    return `x: ${this.x}; y: ${this.y}`;
  }
}

const point = new Point(100, 200);
console.log(point.hasOwnProperty('x')); // true
console.log(point.hasOwnProperty('y')); // true
console.log(point.hasOwnProperty('toString')); // false
```

## 取值函数（getter）和存值函数（setter）

```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // 不需要使用 function 定义方法
  toString() {
    return `x: ${this.x}; y: ${this.y}`;
  }

  get prop() {
    console.log('getter');
    return 'prop';
  }

  set prop(value) {
    console.log('setter', value);
    // this.prop = value;
  }
}

// 存取值 
console.log(point.prop);
// 'getter'
// 'prop'

point.prop = 'hello'; // 'setter hello'
```

- 存值函数和取值函数都是设置在属性的描述符（Descriptor）上

```js
const descriptor = Object.getOwnPropertyDescriptor(Point.prototype, 'prop');
console.log('get' in descriptor); // true
console.log('set' in descriptor); // true
```

## 属性表达式

```js
const methodName = 'getName';

class Point {
  //...
  [methodName]() {
    // ...
  }
}
```

## Class 表达式

```js
const someClass = class Me {
  getClassName() {
    return Me.name;
  }
}
```

- 注意， 这个类的名字是 `Me` ，但只能在 class 内部使用，
  外部只能使用 someClass 引用

## 注意点

- 默认是严格模式

- 不存在提升

- name 属性，总是返回紧跟 class 后面的类名

```js
class Hello {}
Hello.name // Hello
``` 

- Generator 方法 TODO

- this 指向
  > 类的方法内部如果含有 this ，默认指向类的实例，但是使用时需特别小心

```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    // 绑定
    this.getString = this.getString.bind(this);
  }

  // 不需要使用 function 定义方法
  toString() {
    return `x: ${this.x}; y: ${this.y}`;
  }

  getString() {
    return this.toString();
  }
}

const point = new Point(100, 200);
const { getString } = point;
getString(); // Uncaught TypeError: Cannot read property 'toString' of undefined
// getString 中的 this 默认指向 Point ，但是如果将这个方法提出来单独使用，this 会指向该方法运行时环境  
// 因为 class 内部是严格模式，所以 this 实际指向是 undefined 
```
> 解决方法：  
  1. 在构造方法中绑定 this （this.getString = this.getString.bind(this);）  
```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    // 绑定
    this.getString = this.getString.bind(this);
  }

  // 不需要使用 function 定义方法
  toString() {
    return `x: ${this.x}; y: ${this.y}`;
  }

  getString() {
    return this.toString();
  }
}

const point = new Point(100, 200);
const { getString } = point;
console.log(getString()); // x: 100; y: 200
```
  2. 箭头函数
```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    // 箭头函数
    this.getThis = () => this;
  }

  // 不需要使用 function 定义方法
  toString() {
    return `x: ${this.x}; y: ${this.y}`;
  }

  getString() {
    return this.toString();
  }
}

const point = new Point(100, 200);
const { getThis, getString } = point;
console.log(getThis().getString()); // x: 100; y: 200
```

## 静态方法

- 类相当于实例的原型，所有定义在类上的方法都会被实例继承。如果在某个方法前面加上 `static` ，则表示该方法不会被实例继承，  
  而是直接通过类调用。

```js
class Bar {
  static getName() {
    // ...
  }
}

const bar = new Bar();
bar.getName() // Error
```

- 如果静态方法包含 `this` ，则 `this` 指的是类，而不是实例。

```js
class Bar {
  static getName() {
    this.queryName();
  }

  // 类调用的方法
  static queryName() {
    console.log('hello');
  }

  // 实例调用的方法
  queryName() {
    console.log('world');
  }
}

Bar.getName() // 'hello'
```

- 父类的静态方法，可以被子类继承

```js
class Bar {
  static getName() {
    // ...
  }
}

class Foo extends Bar {

}
Foo.getName();
```

## 实例属性的新写法

- 实例属性除了可以定义在 constructor 的 this 上，也可以定义在类的最顶层。

```js
class Foo {
  bar = 'hello';
  baz = 'world';

  constructor() {
    // ...
  }
}
```

## 静态属性 

- 是指 Class 本身的属性，而不是定义在 this 上的

```js
class Boo {
  static num = 1;

}

Boo.count = 12

console.log(Boo.num); // 1
console.log(Boo.count); // 12
```

## 私有属性和私有方法

- 只能在类内部使用 

```js
class Boo {
  #age = 0;

  up () {
    this.#age++;
    console.log(this.#age);
  }

  get age() {
    return this.#age;
  }

  set age(value) {
    this.#age = value;
  }
}

const boo = new Boo();
boo.up(); // 1
boo.up(); // 2
// boo.#age; // Error

console.log(boo.age); // 2
boo.age = 10;
console.log(boo.age); // 10
```