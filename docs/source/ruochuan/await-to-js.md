# await-to-js

## 概念

- Async await wrapper for easy error handling 轻松处理错误的异步等待封装器

- 使用 `await` 处理异步操作时， Promise 有可能返回 `rejected` ，一般会将 `await` 放到 `try...catch` 中，
`await-to-js` 可以解决不使用 `try...catch` 处理 `rejected` 

- [Github-await-to-js](https://github.com/scopsy/await-to-js)

## 使用 和 对比

```js
import to from 'await-to-js'

async fn() {
  const [err, res] = await to(asyncFn())
  if (err) {
    // ...
  }

  // ...
}

// 多个异步操作情况

// async await
function async fn() {
  try {
    const p1 = await sFn1()
  } catch {
    // ...
  }

  try {
    const p2 = await sFn2()
  } catch {
    // ...
  }

  try {
    const p3 = await sFn3()
  } catch {
    // ...
  }
}

// await to js
function async fn() {
  const [e1, r1] = await to(sFn1())
  if (e1) { // ...}
  const [e2, r2] = await to(sFn2())
  if (e2) { // ...}
  const [e3, r3] = await to(sFn3())
  if (e3) { // ...}
}

```

## 实现

- 参数  

1. promise 异步操作
2. errorExt 自定义扩展错误信息 `Object.assign({}, err, errorExt)`

- 返回值： `then` 返回 `[null, data]` ， `catch` 返回 `[err, undefined]`

```ts
/**
 * @param { Promise } promise
 * @param { Object= } errorExt - Additional Information you can pass to the err object 自定义扩展错误信息
 * @return { Promise }
 */
export function to<T, U = Error> (
  promise: Promise<T>,
  errorExt?: object
): Promise<[U, undefined] | [null, T]> {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, undefined]>((err: U) => {
      if (errorExt) {
        const parsedError = Object.assign({}, err, errorExt);
        return [parsedError, undefined];
      }

      return [err, undefined];
    });
}

export default to;
```

## 收获

- 简单至上 