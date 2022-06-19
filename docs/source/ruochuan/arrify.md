# arrify 转数组

- [github](https://github.com/sindresorhus/arrify)

## 如何使用

```js
import arrify from 'arrify';

// 字符串 转为数组
arrify('🦄');
//=> ['🦄']

// 数组 本身
arrify(['🦄']);
//=> ['🦄']

// 可迭代对象
arrify(new Set(['🦄']));
//=> ['🦄']

arrify(null);
//=> []

arrify(undefined);
//=> []
```

## 源码

```js
export default function arrify(value) {
	if (value === null || value === undefined) {
		return [];
	}

	if (Array.isArray(value)) {
		return value;
	}

	if (typeof value === 'string') {
		return [value];
	}

	if (typeof value[Symbol.iterator] === 'function') {
		return [...value];
	}

	return [value];
}
```

- 是否可迭代对象判断方法 `typeof value[Symbol.iterator] === 'function'`

## 可迭代对象

- 目前内置可迭代对象，String Array Map Set TypedArray ，原型都实现 `@@iterator` 方法

- [Symbol.iterator](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator) 为每一个对象定义了默认的迭代器，可被 for...of 循环使用

- [迭代协议](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols) 分为 可迭代协议和迭代器协议，可迭代对象必须同时满足这两个协议

- 要成为可迭代对象，这个对象必须实现 `@@iterator` 方法，这意味着对象或原型链上必须有一个键值为 `@@iterator` 的属性，可以通过 `Symbol.iterator` 访问到

- 当一个对象需要被迭代时，首先会不带参数调用 `@@iterator` 方法，然后用此方法返回的**迭代器**获得要迭代的值

- 迭代器拥有 `next()` 方法

```js
const str = 'hi'

console.log(typeof str[Symbol.iterator]) // "function"

const iterator = str[Symbol.iterator]()

console.log(iterator + '') // "[object String Iterator]"

console.log(iterator.next()) // { "value": 'h', 'done': false }

console.log(iterator.next()) // { "value": 'i', 'done': false }

console.log(iterator.next()) // { done': true }
```

```js
const map = new Map();
map.set("name", "hello");
map.set("age", 12);

for (const i of map) {
  console.log(i);
}

const type = typeof map[Symbol.iterator];

console.log(type); // "function"

console.log([...map]); // [object Array] [['name', 'hello'],['age', 12]]
```

## 收获

- 判断是否可迭代对象的方法 `typeof value[Symbol.iterator] === 'function'`

- 了解 可迭代对象 实现方法

- 了解 迭代协议 的概念
