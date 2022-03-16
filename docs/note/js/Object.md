# Object 

- [JavaScript 对象所有API解析](https://lxchuan12.gitee.io/js-object-api/#%E4%B8%80%E3%80%81object%E6%9E%84%E9%80%A0%E5%99%A8%E7%9A%84%E6%88%90%E5%91%98)

## Object.getOwnPropertyNames(obj)

- 参数 obj ，一个对象

- 返回值 返回 obj 可枚举和不可枚举属性名称的集合

- 不会获取到原型链上属性

```js
const ob1 = {
  a: [1,2,3],
  o: {
    a: 1,
    b: 2
  },
  map: new Map()
}

ob1.map.set('name', 'hello')

console.log(Object.getOwnPropertyNames(ob1.a)); // ['0','1','2','length']
console.log(Object.getOwnPropertyNames(ob1.o)); // ['a','b']
console.log(Object.getOwnPropertyNames(ob1.map)); // []

// 获取不可枚举属性
const ob2 = Object.create({}, {
  name: {
    value: 'me',
    enumerable: false
  }
})
ob2.age = 12
console.log(Object.getOwnPropertyNames(ob2)); // ['name', 'age']
// Object.keys 只获取可枚举属性
console.log(Object.keys(ob2)); // ['age']

// 不会获取原型链上的属性
function fnClass() {
  this.name = 'Ben'
  this.method = function() {}
}
fnClass.prototype.proName = 'proName'
fnClass.prototype.proMethod = function() {}
console.log(Object.getOwnPropertyNames(new fnClass())); // ['name', 'method']

// ES6 中 非对象参数会被强制转换为对象
console.log(Object.getOwnPropertyNames('foo')); // ['0', '1', '2', 'length']
```

## Object.create(proto, [propertiesObject])

- 创建一个新对象，使用现有对象来提供新对象的对象的 __proto__ 

- 参数 
> proto 新创建对象的原型对象  
  propertiesObject 可选 该传入对象的自有可枚举属性将为新创建的对象添加指定的属性值和对应的属性描述符  

- 返回值 一个新对象，带着指定的原型对象和属性

```js
const createObj = {
  name: 'hh',
  age: 12,
  print: function() {
    console.log(`my name is ${this.name}, age: ${this.age}`);
  }
}
const createInstance = Object.create(createObj)
createInstance.age = 14
console.log(createInstance.__proto__); // 结构等于 createObj
console.log(createInstance.print()); // my name is hh, age: 14
console.log(createObj); // age = 12

// Object.create() 实现继承
function Father() {
  this.x = 0
  this.y = 1
}
Father.prototype.move = function(x, y) {
  this.x += x
  this.y += y
  console.log('Father Moved.');
}

function Child() {
  this.age = 12
  Father.call(this)
}

Child.prototype = Object.create(Father.prototype)
Child.prototype.constructor = Child

const child = new Child()
console.log(child);
console.log(child instanceof Father); // true
console.log(child instanceof Child); // true
```

## propertyObject 参数

```js
const o3 = Object.create(null) // 创建一个原型为 null 的空对象
const o4 = {} // 等价于 o4 = Object.create(Object.prototype)

const o4 = Object.create({}, {
  foo: {
    writable: true,
    configurable: true,
    value: 'foo'
  },
  bar: {
    configurable: false,
    get: function() { return 'bar' },
    set: function(value) {
      console.log('bar value: ', value);
    }
  },
  age: {
    value: 12
  }
})

console.log(o4.foo); // 'foo'
console.log(o4.bar); // 'bar'
o4.bar = 'bb' // bar value: bb
console.log(o4.age); // 12
o4.age = 13
// 属性的特性 writable configurable enumerable 默认为 false
console.log(o4.age); // 12
```
