# Map

- 键值对的集合，但键的范围不局限与字符串，各种类型包括对象都可以作为键。

## 基础

- 各种类型均可作为键

```js
// 各种类型均可作为键
const a = new Map();

const symbol = Symbol('a')
a.set(symbol, 'hello symbol')

const obj = {
  name: 'hello',
  age: 12
}
a.set(obj, 'this is object')

console.log(a.size); // 2
console.log(a.get(symbol)); // hello symbol
console.log(a.get(obj)); // this is object
```

- Set Map 都可用来生成新的 Map

```js
// Set Map 都可用来生成新的 Map
const o1 = [
  ['title', 'hello'],
  ['name', 'Ben']
]

const set2 = new Set(o1)
const map2 = new Map(set2)
console.log(map2.get('title')); // hello

const m3 = new Map(o1)
const m4 = new Map(m3)
console.log(m4.get('name')); // Ben
```

- 如果同一个键赋值多次，则后面覆盖前面的

- 如果读取一个未知的键，返回 undefined

- 只有对同一个对象的引用，Map 结构才视为同一个键

```js
const m1 = new Map()
m1.set(['name'], 'hello')
m1.get(['name']) // undefined
// 内存地址不一致
```

- 同样的值两个实例，在Map结构中被视为两个键

> Map的键实际是跟内存地址绑定的，只要内存地址不一样，就被视为两个键。  
  解决同名属性碰撞的问题  

> 如果Map的键是一个简单的数据类型（数字 布尔 字符串），则只要两个值严格相等，Map将视为同一个键。

```js
const m5 = new Map()
const k1 = ['name']
const k2 = ['name']

m5
  .set(k1, '111')
  .set(k2, '222')

console.log(m5.get(k1)); // 111
console.log(m5.get(k2)); // 222
```

## 实例属性和方法

- size

- set(key, value)

- get(key)

- has(key)

- delete(key)

- clear()

- keys()

- values()

- entries() 

- forEach() 

```js
// Map.forEach()
m6.forEach((value, key, map) => {
  console.log(`key: ${key}, value: ${value}`);
})

// forEach 绑定 this
const reporter = {
  conLog: function(key, value) { // 这里不能使用箭头函数
    console.log(`key: ${key}, value: ${value}`);
  }
} 

m6.forEach(function (value, key, map) { // 这里不能使用箭头函数
  this.conLog(key, value)
}, reporter)
```

- Map 结构转为数组结构 快速方法是使用扩展运算符 `...`


# WeakMap

- 只接收对象（null除外）作为键名
- WeakMap 键名指向的对象 不计入垃圾回收机制
