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

## Diffing算法 

- 比对不同类型的元素
  - 当根节点为不同类型的元素时，React会拆卸原有的树并且建立新的树，会触发一个完整的重建流程
  - 当拆卸一棵树时，对应的DOM节点也会被销毁

- 比对同一类型的元素
  - 当比对两个相同类型的React元素时，React会保留DOM节点，仅比对及更新有改变的属性
  - 在处理完当前节点后，React继续对子节点进行递归

- 比对同类型的组件元素
  - 当一个组件更新时，组件实例保持不变，这样state在跨越不同的渲染时保持一致，React将更新该组件实例的props以跟最新的元素保持一致

- 对子节点进行递归
  - key 属性使转换高效

## Context

- 无需在每层组件添加props，就能在组件树中传递数据

- 设计目的是共享对于组件树而言是全局的数据

### API

- `React.createContext()`

```js
const Context = React.createContext(defaultValue);
```

> 订阅 context 的组件，会从离自身最近的匹配的 `Provider` 中读取当前的context值

> 只有当组件所处的树中没有匹配到 Provider 时，其 defaultValue 参数才会生效 

> 将 undefined 传递给 Provider 的 value 时，消费组件的 defaultValue 不会生效 

- `Context.Provider`
  - 允许消费组件订阅context变化
  - 当 Provider 的 value 发生变化时，内部的消费组件都会重新渲染

```js
<Context.Provider value={/* 值 */}>
  /* 消费组件 */
  <Consumer />
</Context.Provider>
```