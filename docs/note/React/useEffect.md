# useEffect

- [参考](https://react.docschina.org/docs/hooks-effect.html)

- 浏览器重绘之后才异步执行

- 默认情况下，第一次渲染之后和每次依赖值更新之后都会执行

- React 保证了每次运行 effect 后，DOM都已经更新完毕

- 每次重新渲染，都会生成新的 effect 

- useLayoutEffect 是在浏览器重绘之前同步执行的

- 每个 effect 都可以返回一个清除函数（可选的清除机制），React 会在组件卸载的时候执行清楚操作

## 为什么每次更新的时候都要运行 Effect

- 保证状态实时更新

## 通过跳过 Effect 进行性能优化

- 增加第二个参数（依赖值）

```js
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 仅在 count 更改时更新
```
