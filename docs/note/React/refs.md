# Refs

- 将 ref 自动通过组件传递到一子组件的方法

## 转发 refs 到 DOM 组件

```js
// 第二个参数只在使用 React.forwardRef 定义组件时存在
// 常规函数和class组件不接受 ref 参数 且 props 中也不存在 ref
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// 你可以直接获取 DOM button 的 ref：
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```