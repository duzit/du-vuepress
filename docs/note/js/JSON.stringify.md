# JSON.stringify()

## 定义

### JSON.stringify(value[, replacer[, space]])

- value 将要序列化的值

- replacer 可选  
1. 如果是一个函数，则在序列化过程中，每个值都会经过改函数的转换处理 
2. 如果是一个数组，则只有包含在这个数组中的属性名才会被序列化
3. 如果为null 或 未提供，则所有属性都会被序列化

- space 可选
1. 指定缩进用的字符串，用于美化输出 
2. 如果是数字，表示几个空格，上限为10，小于1则表示没有空格
3. 如果是字符串，则表示使用字符串作为空格，长度上限10

## 基本使用

```js
const obj1 = {
  name: 'Ben',
  age: 12
};
// 转换对象
console.log(JSON.stringify(obj1));

// 转换值
console.log(JSON.stringify(true)); // 'true'
console.log(JSON.stringify('hello'));
console.log(JSON.stringify(12));
console.log(JSON.stringify(null) === 'null'); // true

// repalcer
console.log(JSON.stringify(obj1, (key, value) => {
  return typeof value === 'number' ? value + '' : value
})); // {"name":"Ben","age":"12"}

// 指定数组
console.log(JSON.stringify(obj1, ['name'])); // {"name":"Ben"}

// space
console.log(JSON.stringify(obj1, null, 2));
// {
//   "name": "Ben",
//   "age": 12
// }
```

## 特性

### 一

- `undefined` `任意的函数` `Symbol` 值出现在 `非数组对象` 的属性值中将会被忽略 

- `undefined` `任意的函数` `Symbol` 值出现在 `非数组对象` 的属性值中将会被忽略 

- `undefined` `任意的函数` `Symbol` 被单独转换时，会返回 undefined

```js
const obj2 = {
  name: 'Lee',
  age: 10,
  sex: undefined,
  getName: function() {

  },
  sym: Symbol('sym'),
}

console.log(JSON.stringify(obj2, null, 2));
// {
//   "name": "Lee",
//   "age": 10
// }

const arr2 = [
  'hello',
  12,
  function() {},
  Symbol('arr'),
  undefined
];
console.log(JSON.stringify(arr2)); // ["hello",12,null,null,null]

console.log(JSON.stringify(undefined)); // undefined
console.log(JSON.stringify(function() {})); // undefined
console.log(JSON.stringify(Symbol('sym'))); // undefined
```

### 二

- NaN Infinity null 都会被当做 null

```js
console.log(JSON.stringify({
  nan: NaN,
  num: Infinity,
  nu: null
})); // {"nan":null,"num":null,"nu":null}

console.log(JSON.stringify([NaN, null, Infinity])); // [null,null,null]
```

### 三

- 转换值如果有 `toJSON()` 方法，该方法定义什么值将会被序列化

```js
const toJsonObj = {
  name: 'hello',
  age: 12,
  toJSON() {
    return {
      sex: '1',
      id: 6
    }
  }
}
console.log(JSON.stringify(toJsonObj)); // {"sex":"1","id":6}
```

### 四

- 对包含循环引用的对象，执行此方法，将会报错

```js
const obj4 = {
  name: 'hh'
}
obj4.obj = obj4;
console.log(JSON.stringify(obj4)); // Uncaught TypeError: Converting circular structure to JSON
```

### 五

- 其他类型的对象（Set/Map/WeakSet/WeakMap），仅会序列化可枚举的属性

```js
let obj5 = {};
Object.defineProperties(obj5, {
  name: {
    value: 'hello',
    enumerable: true
  },
  age: {
    value: 12,
    enumerable: false
  }
})
console.log(JSON.stringify(obj5)); // {"name":"hello"}
```