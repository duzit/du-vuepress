# Promise

- [参考](https://mp.weixin.qq.com/s/6Jsz_mskT4uGbhkzyMUFIw)

- [ES6 Promise 实战练习题](https://mp.weixin.qq.com/s/FTp0o2a8DMINI6J-XNaQ5g)

## 简单介绍Promise

- 是一种异步编程的解决方案，相比于回调函数更灵活和更强大。

- 有三种状态 pending resolved rejected ，状态转换只能由 pending 到 resolved，pending 到 rejected，转换后不能再被改变

- 提供了一些方法 如 then catch finally all race 等

## 是一个简单的 支持异步调用的Promise类

- 

## Promise.then 在 Event Loop 中的执行顺序

- 微任务，在宏任务执行完成后执行

- 在宏任务执行过程中，如果遇到微任务，则把任务放到微任务队列中，等宏任务执行完成后，再依次执行微任务队列中的所有任务 

## 阐述Promise一些静态方法

- `then` 
> 用于处理 resolved rejected 状态，接收两个可选参数（onResolved onRejected），  
  返回一个新的Promise，保证链式调用 

- `catch` 
> 对 then 的封装，只用于接收 reject() 中的错误信息   
  因为 then 方法第二个参数可不传，不传的情况下，reject()错误信息会继续往下传，直到有 onRejected 函数接收为止  

```js
catch(onRejected) {
  return this.then(null, onRejected)
}
```

- `finally` 
> 无论 resolve reject 都会执行

```js
finally(fn) { 
  return this.then(
    val => {
      fn()
      return val
    },
    () => {
      fn()
      throw reason
    }
  )
}
```

- `done`
> 相当于一个不会出错的 catch 方法，一般用于结束 Promise 链 

```js
done() {
  this.catch((err) => {
    throw err
  }) 
}
```

- `all` 
> 接受一个Promise数组，并发执行参数中的Promise，返回一个新Promise  
  所有状态为 resolved 时，返回一个 resolved 的Promise，有一个状态为 rejected，则全部为 rejected 

- `race`
> 接受一个Promise 数组，顺序执行参数中的Promise，有一个状态为 resolved 则返回该 Promise

## Promise 存在哪些缺点

- 无法取消，一旦新建就会立即执行，无法中途取消

- 如果不设置回调函数，Promise 内部的错误不会抛出，

## 使用 Promise 进行顺序（sequence）处理

- async 配合 await

- 使用 promise.then 通过 for 循环 或 reduce 实现

```js
function sequenceTasks(tasks) {
    function recordValue(results, value) {
        results.push(value);
        return results;
    }
    var pushValue = recordValue.bind(null, []);
    return tasks.reduce(function (promise, task) {
        return promise.then(() => task).then(pushValue);
    }, Promise.resolve());
}
```

## 如何停止一个 Promise 链

- 返回一个不执行 resolve 或 reject 的 Promise ，这样的话 这个 promise 一直处于 pending 状态，  
  所以永远不会往下执行 then catch 

```js
Promise.cancel = Promise.stop = function() {
  return new Promise(() => {})
}
```

## promise 链上返回的最后一个Promise出错了怎么办

- 使用 done ，相当于一个不会出错的catch