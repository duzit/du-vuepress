# Object.freeze()

- [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)

- 冻结一个对象，被冻结的对象不能再被修改。不能新增，删除，修改属性值，不能修改描述符属性（enumerable, configurable, writable）

- `参数` 是要被冻结的对象，`返回值` 是冻结的对象，且 返回值 和 参数 是相等的

```js
const obj = {
  name: 'Ben',
  age: 12,
  info: {
    sex: 1
  },
  arr: [1,2]
}

Object.freeze(obj)

// 修改 删除 新增属性值 无效
obj.age = 13
obj.xx = 'xx'
delete obj.name
console.log(JSON.stringify(obj)); // {"name":"Ben","age":12,"info":{"sex":1}}

// 通过 Object.defineProperty() 修改 无效
Object.defineProperty(obj, 'age', { valeu: 14 })
// 通过 修改原型 TypeError
// Object.setPrototypeOf(obj, { age: 14 })

// 冻结数组
const arr = [1,2]

Object.freeze(arr)

arr[0] = 33
// arr.push(4) // TypeError
console.log(arr); // [1, 2]

// Object.freeze 只能冻结一层对象 可以修改二层
obj.info.sex = 2

console.log(JSON.stringify(obj)); // {"name":"Ben","age":12,"info":{"sex":2},"arr":[1,2]}

// 要使对象不可变，需要递归冻结每个类型为对象的属性（深冻结）
// 深冻结函数
function deepFreeze(obj) {
  // 取回定义在obj上的属性名
  var propNames = Object.getOwnPropertyNames(obj);

  // 在冻结自身之前冻结属性
  propNames.forEach(function(name) {
    var prop = obj[name];

    // 如果prop是个对象，冻结它
    if (typeof prop == 'object' && prop !== null)
      deepFreeze(prop);
  });

  // 冻结自身(no-op if already frozen)
  return Object.freeze(obj);
}

obj2 = {
  internal: {}
};

deepFreeze(obj2);
obj2.internal.a = 'anotherValue';
obj2.internal.a; // undefined
```

## Notes 

- 在ES5中，如果这个方法的参数不是一个对象（一个原始值），那么它会导致 TypeError
- 在ES2015中，非对象参数将被视为要被冻结的普通对象，并被简单地返回

```js
Object.freeze(1)
// TypeError: 1 is not an object // ES5 code

Object.freeze(1)
// 1                             // ES2015 code
```