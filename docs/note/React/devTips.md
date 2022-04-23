# 开发问题汇总

## 使用 useState 定义的 list 在函数中取值时不是最新的

- 使用 useEffect 和 useRef 

```js
const [list, setList] = useState([])

// 更新 list[index] 中的 name
const changeName = (o, index, v) => {
  // 这里取值list 在其他地方可能会使用 setList 更新值 但因为 setList 是异步的
  // 如果这时需要操作 list 那么这里的 list 就有可能不是最新的数据
  const backup = list
  o['name'] = v
  backup.splice(index, 1, { ...o })
  setList(backup)
} 

// 解决方法
const [list, setList] = useState([])
const refList = useRef([]) // 新增

// 新增
// 使用useEffect 实时赋值给 refList
useEffect(() => {
  refList.current = list
}, [list])

// 更新 list[index] 中的 name
const changeName = (o, index, v) => {
  // const backup = list // 删除
  const backup = refList.current.slice() // 新增
  o['name'] = v
  backup.splice(index, 1, { ...o })
  setList(backup)
} 
```

## 支持多个 className 写法

- 使用模板字符串 ``

```js
<div className={`${styles.content} mr20`></div>
```

## 如何通过 `ref` 调用子组件方法 

- [参考 useimperativehandle](https://zh-hans.reactjs.org/docs/hooks-reference.html#useimperativehandle)

- 父组件通过 useRef 定义 ref 

- 子组件需引用 useImperativeHandle（暴露出去的方法） 和 forwardRef（导出组件时用）

```js
const refItem = useRef(null)

<myItems ref={refItem} />

// 调用子组件方法
const infos = refItem.current.getInfo()

// 子组件 myItems
// 引用 useImperativeHandle, forwardRef
import React, { useImperativeHandle, forwardRef } from 'react'

// 参数ref 必须
const myItems = (props, ref) => {

  const [info, setInfo] = useState('')

  // 暴露方法
  useImperativeHandle(ref, () => ({
    getInfo: () => {
      return info
    }
  }))
}

// 导出时使用 forwardRef
export default forwardRef(myItems)
```

## 使用 `useMemo` 定义表单项，下拉数据 options 改变后，表单项数据未更新

- [参考 useMemo](https://zh-hans.reactjs.org/docs/hooks-reference.html#usememo)

- useMemo(() => computeExpensiveValue(a, b), [a, b]);

- 原因是 `useMemo` 是个 memoized 值，只有依赖值改变后才会重新计算，即第二个参数中写入依赖的值（options）

## antDesign Modal 弹窗 确认按钮 根据条件 disabled 

- 使用 `okButtonProps`

```js
<Modal
  okButtonProps={{
    disabled: isDisabled
  }}
/>
```

## antDesign Table 设置固定宽度，当 column 过多时无效

- 设置 Table 的 scroll 属性 x: '100%'

```js
<Table
  scroll={{ x: '100%', y: '100vh' }}
/>
```

## 使用 ServModal（syfed-ui 提供） onOk 回调中接口报错但弹窗关闭问题

- [syfed-ui](http://10.199.12.12:5000/)

- onOk 回调中 return false ，涉及接口的在 then 后使用 modal.close()

```js
<ServModal
  modal={fileModal}
  onOk={handleOk}
>
</ServModal>

const handleOk = () => {
  service.api()
    .then(() => {
      // ...
      // 使用 modal.close() 
      fileModal.close();
    })

  // 返回 false 保证只有接口执行成功后才关闭弹窗
  return false;
}
```