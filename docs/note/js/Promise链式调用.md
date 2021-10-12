# Promise 链式调用

- resolve
> 在 then or catch 中 需要显式地返回（return Promise.reject() or return Promise.resolve()）  
  才能在下一个 then or catch 中 获取到数据

```js
const promise1 = new Promise((resolve) => {
  resolve('resolve');
})

promise1
  .then(res => {
    console.log(res); // resolve
    return Promise.reject('reject in resolve then.')
  })
  .catch(err => {
    console.log(err); // reject in resolve then.
    return Promise.resolve('resolve in catch')
  })
  .then(res => {
    console.log(res); // resolve in catch
  })

promise1
  .catch(err => {
    console.log(err);
  })
  .then(res => {
    console.log(res); // resolve
    return Promise.reject('reject in resolve then.')
  })
// Uncaught (in promise) reject in resolve then.
```