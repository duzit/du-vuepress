# 深入 JSX 

- React.createElement(component, props, ...children)函数的语法糖

## React 必须在作用域内

- 因为 JSX 会编译为 React.createElement 调用形式，所以 React 库必须包含在 JSX 代码作用域内

## JSX 中的 Props

- js 表达式作为 props , if 和 for 不是 js 表达式，不能直接使用

```js
<MyBtns foo={1 + 2 + 3} />
```

- 字符串字面量

```js
<MyBtns msg='hello' />
<MyBtns msg={'hello'} />
```

- 属性展开

```tsx
function App() {
  const props = {
    fName: 'hello',
    lName: 'moto'
  }

  return <MyComponent {...props} />
}
```

## JSX 中的子元素

- 字符串字面量

```js
<MyComponent>Hello world!</MyComponent>

function MyComponent(props) {
  // props.children === 'Hello world!'
  return <div>{props.children}</div>
}
```

- JSX子元素

```js
// 组件嵌套
<MyComponent>
  <HeaderComp />
  <BottomComp />
</MyComponent>
```

- 函数作为子元素

```tsx
function Repeat(props: any) {
  let items = [];
  for (let index: number = 0; index < props.times; index++) {
    items.push(props?.children(index));
  }

  return <div>{items}</div>
}

<Repeat times={10}>
  {
    (index: number) => <div key={index}> hello {index}</div>
  }
</Repeat>
```

-  布尔类型 Null 以及 Undefined 将会被忽略，不会被渲染

```html
<div />

<div></div>

<div>{false}</div>

<div>{null}</div>

<div>{undefined}</div>

<div>{true}</div>
```

- **注意：有一些 falsy 值，如数字0，仍然会被渲染**

```tsx
// 当 props.message 空数组时，0 仍然会被渲染
<div>
  {props.messages.length &&
    <MessageList messages={props.messages} />
  }
</div>

// 解决
<div>
  {props.messages.length > 0 &&
    <MessageList messages={props.messages} />
  }
</div>
```