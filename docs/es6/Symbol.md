# Symbol 

## 概述

- 表示独一无二的值

- 如果作为对象的属性名，可以保证与其他属性不会冲突

- 不使用 `new` 命令，因为生成的 `Symbol` 是原型类型的值，不是对象。基本数据类型的一种。

- 接收一个字符串作为参数，表示对 `Symbol` 的描述，用于区分。
```js
let s1 = Symbol('s1')
let s2 = Symbol('s2')
```

- 如果 `Symbol` 参数是一个对象，就会调用该对象的 `toString()` 方法，将其转为字符串，然后才生成一个 Symbol 值。
```js
const obj1 = {
  toString() {
    return 'abc'
  }
}

const s1 = Symbol(obj1)
console.log(s1); // Symbol(abc)
// 如果没有定义toString方法 返回 Symbol([object Object])
```

- `Symbol` 函数的参数只是表示对当前 Symbol 值的描述，因此相同参数的 Symbol 函数返回的值是不相等的。
```js
const s2 = Symbol()
const s3 = Symbol()
console.log(s2 === s3); // false
```

- Symbol 值不能与其他类型的值进行运算，否则会报错。但是可以显式转为字符串。  
  Symbol 值可以转为 Boolean 值，但不能转为数值
```js
const s4 = Symbol('hello')
// s4 + 'world' // Error
console.log(String(s4)); // Symbol(hello)
console.log(s4.toString()); // Symbol(hello)

console.log(Boolean(s4), !s4); // true false
// Number(s4) // Error
```

## Symbol.prototype.description 

- 读取 Symbol 的描述

```js
const s5 = Symbol('Ben')
console.log(s5.description); // Ben
```

## 作为属性名的 Symbol

- 通过方括号结构 或 Object.defineProperty() 将对象的属性名定义为一个 Symbol

```js
const s6 = Symbol()
let obj6 = {}
obj6[s6] = 'hello'

let obj7 = {
  [s6]: 'hello'
}

let obj8 = {}
Object.defineProperty(obj8, s6, { value: 'hello'})
```

- Symbol 值作为对象的属性名时 不能用点运算符

```js
let s7 = Symbol()
let obj = {}
obj.s7 = 'hello' // s7 属性名实际是字符串
obj[s7] // undefined
obj['s7'] // hello
```

## 属性名的遍历

- Symbol 作为属性名，遍历对象时，不会出现在 for...in for...of 循环中，  
  也不会被 Object.keys() Object.getOwnPropertyNames() JSON.stringify() 返回  
  Object.getOwnPropertySymbols() 返回对象的 Symbol 属性
  Reflect.ownKeys() 可以返回所有类型的键值

```js
const s7 = Symbol('boo')
const s8 = Symbol('bar')
const obj9 = {
  [s7]: 'hello',
  [s8]: 'ben',
  name: 'Neo',
  age: 12
}

console.log(Object.keys(obj9)); // ["name", "age"]
console.log(Object.getOwnPropertyNames(obj9)); // ["name", "age"]
console.log(JSON.stringify(obj9)); // {"name":"Neo","age":12}
console.log(Object.getOwnPropertySymbols(obj9)); // [Symbol(boo), Symbol(bar)]

const ownKeys = Reflect.ownKeys(obj9);
for (const item of ownKeys) {
  console.log(item);
  // name
  // age
  // Symbol(boo)
  // Symbol(bar)
}
```

## Symbol.for() Symbol.keyFor()

### Symbol.for()
- 重新使用同一个 Symbol 值
- 接收一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值，  
  如果有则返回该值，没有则创建一个以该字符串为名称的 Symbol ，并将其注册到全局。
```js
const sf1 = Symbol.for('hello');
const sf2 = Symbol.for('hello');
console.log(sf1 === sf2); // true
```

### Symbol.keyFor()
- 返回一个已登记的 Symbol 值的key
```js
console.log(Symbol.keyFor(sf1)); // hello
console.log(Symbol.keyFor(s4)); // undefined
```