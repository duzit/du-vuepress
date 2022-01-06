# toString 

## 概念

- 每个对象都有一个 `toString()` 方法，当该对象被表示为一个文本值时，或者一个对象以预期的字符串方式引用时自动调用

- `toString()` 方法被每个 Object 对象继承，如果此方法未被自定义覆盖，则返回 `[object type]`，  
  其中 `type` 是对象的类型

```js
var o = new Object();
o.toString(); // returns [object Object]
```

## 覆盖默认的 toString() 方法

```js
function Person(name) {
  this.name = name
}

const zs = new Person('zhangsan')
zs.toString() // [object Object]

Person.prototype.toString = function() {
  return `Hello ${this.name}`
}

zs.toString() // Hello zhangsan
```

## 检测对象类型

```js
const toString = Object.prototype.toString

toString.call(new Date()) // '[object Date]'
toString.call(false)
// '[object Boolean]'
toString.call(12)
// '[object Number]'
toString.call('hh')
// '[object String]'
```