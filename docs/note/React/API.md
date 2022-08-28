# API 

## React.Children

- 提供了用于处理 this.props.children 不透明数据结构的使用方法
  - count
  - forEach
  - map
  - only
  - toArray

```
count: ƒ countChildren(children)
forEach: ƒ forEachChildren(children, forEachFunc, forEachContext)
map: ƒ mapChildren(children, func, context)
only: ƒ onlyChild(children)
toArray: ƒ toArray(children)
```

## React.cloneElement

```js
React.cloneElement(
  element,
  [config],
  [...children]
)
```

- 克隆 element 元素并返回新的元素

- config 中包含新的 props，key，或ref，返回元素的props是将新的props与原始元素的props浅层合并后的结果，
如果config中未出现key或ref，那么原始元素的key和ref将保留

## React.isValidElement

- 验证对象是否为React元素 返回Boolean

```js
import React from "react";

function MyComponent(props) {
  console.log(props.children, 'props.children');
  if (!props.children) return null;

  const reactChildren = React.Children;
  console.log(reactChildren, 'reactChildren');
  /**
   * count: ƒ countChildren(children)
    forEach: ƒ forEachChildren(children, forEachFunc, forEachContext)
    map: ƒ mapChildren(children, func, context)
    only: ƒ onlyChild(children)
    toArray: ƒ toArray(children)
   */

    reactChildren.forEach(props.children, item => {
      console.log(item.props); // { name: HZ } { name: NJ }
    })

    // map 需显示返回
    const ret = reactChildren.map(props.children, item => {
      return item
    })

    const count = reactChildren.count(props.children);
    console.log(count); // children 个数

    // children 只有一个子节点时才有返回值，否则报错
    // const only = reactChildren.only(props.children);
    // console.log(only);
    /**
     * $$typeof: Symbol(react.element)
      key: null
      props: {name: 'NJ'}
      ref: null
      type: ƒ Item(props)
      _owner: FiberNode {tag: 0, key: null, stateNode: null, elementType: ƒ, type: ƒ, …}
      _store: {validated: true} 
     */
    // 否则报错
    // Uncaught Error: React.Children.only expected to receive a single React element child.

    // 返回数组 为每个元素增加一个key
    const toArray = reactChildren.toArray(props.children);
    console.log(toArray);
    // 单个元素数据格式
    /**
     * $$typeof: Symbol(react.element)
      key: ".0"
      props: {name: 'HZ', children: {…}}
      ref: null
      type: ƒ Item(props)
      _owner: FiberNode {tag: 0, key: null, stateNode: null, elementType: ƒ, type: ƒ, …}
      _store: {validated: false}
     */

    // 隐式混入props
    const clone = React.cloneElement;
    const ret2 = reactChildren.map(props.children, item => {
      return clone(item, { area: 'China' });
    })

    // 验证children
    const isValid = React.isValidElement;
    const ret3 = reactChildren.map(props.children, item => {
      console.log(isValid(item));
      return isValid(item) ? item : typeof item === 'function' ? item() : null;
    })

  // return props.children;
  // return ret;
  // return ret2;
  return ret3;
}

function Item(props) {
  return (
    <div>
      Hello {props.name}, {props.area}
      {props.children}
    </div>
  )
}

function MyComponent2(props) {
  console.log(22222);
  console.log(props.children);
  console.log(React.Children.toArray(props.children));

  const ele = 
    React.isValidElement(props.children) ? 
      props.children : 
      typeof props.children === 'function' ?
        props.children() : null;
  return ele;
}

function Render(props) {

  return (
    <>
      <MyComponent>
        <Item name='HZ'>
          <div>xixi</div>
        </Item>
        <Item name='NJ'></Item>
        <div>China</div>
      </MyComponent>
      <MyComponent2>
        {() => <Item name='FJ' />}
      </MyComponent2>
    </>
  );
}

export default Render;
```