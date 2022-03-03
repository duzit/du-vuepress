# async await

- [理解 JavaScript 的 async/await](https://segmentfault.com/a/1190000007535316)

- [async 函数是什么](http://www.ruanyifeng.com/blog/2015/05/async.html)

## 概念

- async 用于声明一个异步函数， await 用于等待一个异步函数执行完成

## async 起什么作用

- async 函数返回一个 Promise 对象，如果在函数中返回一个直接量，async 会把这个直接量通过 Promise.resolve() 封装成 Promise 对象

- 可以通过 then 链处理返回值

- 如果 async 函数没有返回值，会返回 Promise.resolve(undefined)

```js
async function fn1() {
  return 'fn1'
}

console.log(fn1());
// Promise
// [[Prototype]]: Promise
// [[PromiseState]]: "fulfilled"
// [[PromiseResult]]: "fn1"

fn1().then(res => {
  console.log(res); // fn1
})

async function fn2() {
  
}

fn2().then(res => {
  console.log(res); // undefined
})
```

## await 在等啥 

- 等待 async 函数执行完成

- 不仅可以等待一个 Promise 对象，也可以等待任意表达式的结果

```js
function fn3() {
  return 'fn3'
}

async function fn4() {
  return 'fn4'
}

async function fn5() {
  return Promise.resolve('fn5')
}

async function t1() {
  console.log(await fn3()); // fn3
  console.log(await fn4()); // fn4
  console.log(await fn5()); // fn5
}

t1()
```

## await 等到结果之后呢 

- await 是运算符，用于组成表达式，表达式的运算结果取决于它等的东西

- 如果等到的不是一个 Promise 对象，那表达式的运算结果就是它等的东西

- 如果是 Promise 对象，await 就是阻塞后面代码的执行，等待 Promise 对象 resolve，然后得到 resolve 的值，作为表达式的运算结果

## async await 的优势

- 处理 then 链 ，处理多个 Promise 的 then ，后面的 then 依赖上一步的返回值

## 注意点

- await 后面的 Promise 有可能是 rejected ，所以最好将 await 放在 try...catch 中

```js
function fn6() {
  return Promise.reject('err')
}

async function fn7() {
  try {
    const res = await fn6()
  } catch (error) {
    console.log(error); // err
  }
}

fn7()

// or 

async function fn8() {
  const res = await fn6().catch(err => console.log(err)) // err
}

fn8()
```

- await 只能用在 async 函数中，如果用在普通函数会报错