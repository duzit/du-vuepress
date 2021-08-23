# Reflect

- Reflect 同 Proxy 一样，都是ES6为了操作对象而提供的新API，设计目的：
1. 将 Object 一些明显属于语言内部的方法（如 Object.defineProperty），放到 Reflect对象上，  
  现阶段，某些方法同时放在 Reflect 和 Proxy 对象上部署，未来的新方法只部署在 Reflect 上。Reflect对象上  
  可以拿到语言内部的方法。  
2. 修改某些 Object 方法的返回结果。比如 Object.defineProperty(obj, name, desc) 在无法定义属性时会抛出错误，  
  而 Reflect.defineProperty(obj, name, desc) 则会返回 false。

```js
// Object.defineProperty 无法定义属性时会抛出错误 所以防止报错写法如下
try {
  // 重复定义会报错
  Object.defineProperty(obj, 'name', { value: 'hello' })
} catch (error) {
  console.log(error);
}

// Reflect.defineProperty 返回 true false
if (Reflect.defineProperty(obj, 'age', { value: 12 })) {
  // ...
} else {
  // ...
}
```

3. 让 Object 操作变成函数行为。某些 Object 操作是命令式，比如 `name in obj` 和 `delete obj[name]`，  
  `Reflect.has(obj, name)` 和 `Reflect.deleteProerty(obj, name)` 变成函数行为。

4. Reflect 对象的方法和 Proxy 一一对应，只要是 Proxy 对象的方法，都能在 Reflect 对象上找到对应的方法，这让  
  Proxy 对象可以方便的调用对应的 Reflect 的方法，完成默认行为，作为修改行为的基础。不管 Proxy 怎么修改默认行为，  
  总可以在 Reflect 上获取默认行为。

```js
const person = {
  name: 'Hello',
  age: 12
};

const p = new Proxy(person, {
  get: function(target, name) {
    console.log('get handler');
    return Reflect.get(target, name);
  }, 
  set(target, name, value) {
    console.log('set handler');
    return Reflect.set(target, name, value);
  }
})

p.name; // get handler
p.age = 14; // set handler
console.log(p); // { name: 'Hello', age: 14} 

// 保证原生行为能够正常执行，通知增加日志输出
```

5. 有了 Reflect 后 很多操作会更易读

```js
Function.prototype.apply.call(Math.floor, undefined, [1.75]) // 1

Reflect.apply(Math.floor, undefined, [1.75]) // 1
```

## Reflect.get(target, name, receiver)

- 返回 `target` 对象中 `name` 属性， 没有 name 属性，则返回 undefined 

```js
const person = {
  name: 'Hello',
  age: 12
};

console.log(Reflect.get(person, 'name')); // 'Hello'
console.log(Reflect.get(person, 'sex')); // undefined
```

- 如果 name 部署了读取函数（getter），则读取函数的 `this` 绑定 `receiver` 

```js
const person = {
  name: 'Hello',
  age: 12,
  get fn() {
    return `${this.name}-${this.age}`;
  },
  nFn() {
    return `${this.name}-${this.age}`;
  }
};

const receiverObj = {
  name: 'Ben',
  age: 18
}

const ret = Reflect.get(person, 'fn', receiverObj);
console.log(ret); // Ben-18
const ret2 = Reflect.get(person, 'nFn', receiverObj);
console.log(ret2); // Function
```

- 如果第一个参数不是对象，则报错

```js
Reflect.get(false, 'name') // Error
Reflect.get(1, 'name') // Error
```

## Reflect.set(target, name, value, receiver)

- 设置 target 对象 name 属性的值为 value

- 如果 name 属性设置的赋值函数，则赋值函数的 this 绑定 receiver 

```js
const setObj = {
  boo: 1,
  foo: 2,
  set fn(value) {
    return this.foo = value;
  }
}

Reflect.set(setObj, 'boo', 3);
console.log(setObj.boo); // 3

const setReceiver = {
  foo: 5
}

Reflect.set(setObj, 'fn', 4, setReceiver)
console.log(setObj.foo); // 2
console.log(setReceiver.foo); // 4
```

- 如果 Proxy 和 Reflect 联合使用，Proxy 完成拦截赋值操作，Reflect 完成赋值的默认行为。  
  如果传入 receiver ，那么 Reflect.set() 会触发 Proxy.defineProperty 拦截操作

```js
const ob = {
  a: 1
}

const handler = {
  set(target, name, value, receiver) {
    console.log('set');
    Reflect.set(target, name, value, receiver);
  },

  defineProperty(target, name, attr) {
    console.log('defineProperty');
    Reflect.defineProperty(target, name, attr);
  }
}

const o = new Proxy(ob, handler);

o.a = 2
// set
// defineProperty
```

## Reflect.has(target, key)

- 对应 `key in obj` 的 `in` 操作符

## Reflect.deleteProperty(target, key)

- 对应 `delete obj[key]`
- 返回布尔值 

## Reflect.construct(target, args)

- 等同于 `new target(...args)`

```js
function Hello(name, str) {
  console.log(name, str); // 2 'You'
  this.name = name;
} 

const ins = Reflect.construct(Hello, [2, 'You', 1, 3, 4])
console.log(ins.name); // 2
```