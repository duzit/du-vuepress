# Vue2 中的工具函数

## emptyObject 

- 创建一个空对象，一层被冻结，无法修改

- [Object.freeze - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)

```js
var emptyObject = Object.freeze({})
```


## isUndef

- 是否未定义

- [undefined 和 null 区别](https://duzit.github.io/interview/js/null.undefined.html)

```js
function isUndef (v) {
  return v === undefined || v === null
}
```

## isDef

- 是否已定义

```js
function isDef (v) {
  return v !== undefined && v !== null
}
```

## isPrimitive

- 是否是原始值

- 原始值包括 字符串 数字 symbol 布尔

```js
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}
```

## toRawType 

- 转换成原始类型

## isPlainObject 

- 是否是纯对象

```js
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

console.log(isRawType([1,2])); // Array
console.log(isRawType('hello')); // String
console.log(isRawType(false)); // Boolean
console.log(isRawType(null)); // Null
console.log(isRawType({name: 'hello'})); // Object

function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}
// 区分 Array 和 Object
console.log(isPlainObject([])); // false
console.log(isPlainObject({})); // true
```

## isPromise 

- 是否 Promise

```js
function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

console.log(isPromise('hello')); // false
console.log(isPromise(new Promise((resolve, reject) => {
  resolve('success')
}))); // true
async function fn() {}
console.log(isPromise(fn())); // true
```

## makeMap 

- 传入以逗号(,)分割的字符串，生成一个 map（key, value），返回一个函数用来检测 key 是否在这个 map 中

```js
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

const fn1 = makeMap('name,age')
console.log(fn1('name')); // true
console.log(fn1('xx')); // undefined
```

## hasOwn 

- 检测属性是否在自身对象上，而不是查找原型链

```js
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

const obj1 = {
  name: 'hello',
  age: 12
}

Object.prototype.sex = 1

console.log(hasOwn(obj1, 'name')); // true
console.log(hasOwn(obj1, 'sex')); // false
console.log(obj1.sex); // 1
```

## cached

- 缓存fn

```js
/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}
```

## camelize 

- 连字符 `-` 转小驼峰

```js
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

console.log(camelize('on-click')); // onClick
```

## capitalize 

- 首字母大写

```js
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});
console.log(capitalize('hello')); // 'Hello'
```

## hyphenate

- 小驼峰转连字符 `-` 

```js
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

console.log(hyphenate('onClick')); // on-click
```