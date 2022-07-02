# React Hooks 

- [搞懂这12个Hooks，保证让你玩转React](https://juejin.cn/post/7101486767336849421)

## useMemo

- 当一个父组件调用一个子组件时，父组件的 state 发生变化，会导致父组件更新，而子组件虽然没有发生变化，但也会进行更新。当模块非常多时，函数式组件会从头更新到尾，只要一处改变，所有模块都会刷新。

- useMemo 是为了解决这点出现的

  - 可以减少不必要的循环和不必要的渲染

  - 可以减少子组件的渲染次数

  - **注意 有时候配合 `useState` 拿不到最新的值，这种情况可以考虑 `useRef` 解决** 

```js
useMemo(() => (
  <div>
    list.map(...)
  </div>
), [list])
```

## useCallback

- 当点击切换按钮的时候，没有经过 useCallback封装的函数会再次刷新，
而进过过 useCallback包裹的函数不会被再次刷新

```tsx
import React, { useCallback, useState } from "react";
import TestButton from "./TestButton";

const MockMemo = () => {
  const [count, setCount] = useState(0)
  const [show, setShow] = useState(false)

  // 当点击切换按钮的时候，没有经过 useCallback封装的函数会再次刷新，
  // 而进过过 useCallback包裹的函数不会被再次刷新
  const add = useCallback(() => {
    setCount(count + 1)
  }, [count])

  console.log('init');

  return (
    <div>
      <div>
        <TestButton title='普通点击' onClick={() => setCount(count + 1)}></TestButton>
        <TestButton title='useCallback 点击' onClick={add}></TestButton>
      </div>
      <div>count: {count}</div>
      <button onClick={() => {
        console.log('切换success');
        setShow(!show)
      }}>切换</button>
    </div>
  )

}

export default MockMemo;
```

```tsx
import React from "react";

const TestButton = React.memo(({ title, onClick }: any) => {
  console.log(title, 'TestButton');
  
  return (
    <button onClick={onClick}>{title}</button>
  )
})

export default TestButton
```

## useRef 

- 获取当前元素的所有属性

```
<div ref={currRef}> </div>

currRef.current.clientHeight
currRef.current.scrollTop
...
```

- 缓存数据，可以减少不必要的更新（使用useState 会重新渲染）

- useLast 确保获取的是最新值 也可以解决闭包问题

```ts
 import { useRef } from 'react';

const useLatest = <T>(value: T) => {
  const ref = useRef(value)
  ref.current = value

  return ref
};

export default useLatest;
```

