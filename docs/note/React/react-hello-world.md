#  React 官网学习记录

- [hello world](https://react.docschina.org/docs/hello-world.html)

## JSX

- [参考](https://react.docschina.org/docs/introducing-jsx.html)

```js
const element = <h1>Hello, world!</h1>;
```

- 在 JSX 语法中，你可以在大括号内放置任何有效的 JavaScript 表达式。例如，2 + 2，user.firstName 或 formatName(user) 都是有效的 JavaScript 表达式。

- 在编译之后，JSX 表达式会被转为普通 JavaScript 函数调用，并且对其取值后得到 JavaScript 对象。

- 所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 XSS（cross-site-scripting, 跨站脚本）攻击

- Babel 会把 JSX 转译成一个名为 React.createElement() 函数调用。

## 元素渲染

- 与浏览器的 DOM 元素不同，React 元素是创建开销极小的普通对象。React DOM 会负责更新 DOM 来与 React 元素保持一致。

- 想要将一个 React 元素渲染到根 DOM 节点中，只需把它们一起传入 ReactDOM.render()

```html
<div id='root'></div>
```

```js
const element = <h1>Hello, world</h1>
ReactDOM.render(element, document.getElementById('root'));
```

- React 只更新它需要更新的部分， React DOM 会将元素和它的子元素跟之前的状态进行比较，并只会惊醒必要的更新使
DOM打到预期的状态

## 组件 & Props

- 函数组件与 class 组件

- 组件名称必须大写字母开头，小写字母开头的组件被视为原生DOM标签

- Props 的只读性

## 正确地使用state

- 不要直接修改 state

- state 的更新可能是异步的

```js
// 接收一个函数
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

## 事件处理

- 不能通过返回false的方式阻止默认行为，必须显式的使用 `preventDefault`

```js
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```

## 列表 & Key

- 渲染多个组件，可以使用 `{}` 在 JSX 内构建一个元素组合

- Key 值最好是列表中独一无二的字符串，不建议使用 index 作为 key

- key 只是在兄弟节点之间必须唯一

## 组合 继承 

- props children 

```ts
import React from 'react';

const HelloYou = (props: any) => {
  const { name } = props;
  return (
    <div>
      { name }
      { props.children }
    </div>
  )
}

const SplitPanel = (props: any) => {

  return (
    <div>
      { props.left }
      { ' hfksahfjgs' }
      { props.right }
    </div>
  )

}

// 
const Left = () => {
  return (
    <div>left 1111</div>
  )
}

const Right = () => {
  return (
    <div>right 2222</div>
  )
}

const Combine = () => {
  return (
    <>
      <HelloYou name="John">
        {/* children */}
        <p>Hello John</p>
      </HelloYou>
      <SplitPanel left={<Left />} right={<Right />} />
    </>
  )
}

export default Combine;
```