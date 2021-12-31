# EventLoop

- [如何理解单线程的JavaScript及其工作原理](https://mp.weixin.qq.com/s/omqXH1SxJyvl7N8y-6Zp3Q)

## 为什么JavaScript是单线程

* [参考链接](https://mp.weixin.qq.com/s/9iN7XR1PwXfua8SrabOi5w)

* 作为浏览器脚本语言，JavaScript 的主要用途是与用户互动，以及操作DOM。  
  这决定了它只能是单线程，否则会带来很复杂的同步问题。比如，如果是多线程，一个线程添加DOM，另一个删除DOM，  
  浏览器将不知如何处理

- 如果是多线程 会存在线程间的同步问题，比如当页面更新内容时，用户又触发了交互，这时线程间的同步会变得很复杂

## JavaScript 引擎

- 引擎包括两个组件

1. 内存堆 - 进行内存分配的区域
2. 调用栈 - 代码执行时栈中的位置

![js](../assets/eventloop.png)

## 调用栈

- 因为JavaScript是单线程，所以只有一个调用栈，一次只能做一件事。

- 调用栈是一种数据结构，当执行一个函数时，会将其置于栈的底部，执行完成后，将其从底部移除。

## 事件循环

- 负责执行代码，收集和处理事件，以及执行任务队列中的子任务

![](../assets/el.png)

![](../assets/el2.png)

- Javascript 有一个主线程和执行栈，所有的任务都会被放到调用栈等待主线程执行

- 同步任务会被放在调用栈中，按照顺序等待主线程依次执行

- 主线程之外存在一个任务队列，所有任务在主线程中以执行栈的方式运行

- 同步任务都在主线程上执行，栈中代码在执行的时候会调用 Web API，此时会产生一些异步任务

- 异步任务会在有了结果（比如被监听的事件发生时）后，将注册的回调函数放入任务队列中

- 执行栈中任务执行完毕后，此时主线程处于空闲状态，会从任务队列中获取任务进行处理

以上过程会不断重复，这就是浏览器的运行机制，也是Event Loop。

## 任务队列 同步任务和异步任务

* 同步任务，在主线程上排队执行的任务，只有前一个任务执行完毕，才执行下一个任务。

* 异步任务，不进入主线程，而进入任务队列的任务，只有任务队列通知主线程，某个任务可以执行了，  
  该任务才进入主线程执行。

* 只要主线程空了，就会去读取"任务队列"，这就是JavaScript的运行机制。这个过程会不断重复。

* 任务队列是一个事件的队列，IO设备完成一项任务，就在任务队列中添加一个事件，表示相关的异步任务  
  可以进入执行栈了。主线程读取任务队列，就是读取里面有哪些事件。异步任务必须指定回调函数，当主线程开始  
  执行异步任务，其实就是执行对应的回调函数。

## 异步任务分为宏任务和微任务
### 微任务
* 一个需要异步执行的函数，执行时机在主函数执行结束之后，当前宏任务结束之前。常见的微任务：
1. Promise().then()
2. MutaionObserver 
3. process.nextTick（Node.js）

### 宏任务
1. script
2. setTimeout/setInterval

```js
// js 任务队列
var a6 = 6;
setTimeout(() => {
  a6 = 666;
}, 0);
new Promise((res, req) => {
  console.log();
  
})
console.log(a6); // 6

// 整个主任务是一个宏任务
// setTimeout  新的宏任务 下一个循环执行
setTimeout(() => {
  console.log('setTimeout');
}, 0);

let promise =  new Promise((resovle, req) => {
  // Promise 主流程 直接处理
  console.log('Promise 00');
  resovle()
})
// Promise 异步 微任务 放入微任务队列 后面执行
promise.then(() => {
  console.log('Promise 11');
})
// 主流程 直接处理
console.log('normal');
// 到此宏任务执行完毕，然后去微任务队列检查有没有微任务，发现 Promise().then() ，执行，
// 之后，新一轮开始执行宏任务，找到 setTimeout()，执行

// 顺序
// Promise 00
// normal
// Promise 11
// setTimeout
```

## await async
### async 
* 返回一个Promise对象
```js
function f() {
  return Promise.resolve('TEST');
}

// asyncF is equivalent to f!
async function asyncF() {
  return 'TEST';
}
```

### await
* 正常情况 await后面是一个Promise对象，返回该对象的结果，如果不是Promise对象，则返回对应值
```js
async function af() {
  return 123;
}
await af() // 123
```
* 不管await后面跟什么，都会被堵塞
```js
async function f1() {
  console.log(1);
  await f2();
  console.log(3);
}

async function f2() {
  console.log(2);
}

f1();
console.log(4);
// 1 2 4 3
```