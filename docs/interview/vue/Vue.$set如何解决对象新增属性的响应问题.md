# Vue.$set如何解决对象新增属性的响应问题

- Vue.set( target, propertyName/index, value )

> target 是数组， 使用 splice 触发响应式
> target 对象，判断属性是否存在，对象是否是响应式
> 以上都不满足，通过 defineReactive 对属性进行响应式处理

- 注册

```js
// src/core/instance/state.js
import { set } from '../observer/index'

stateMixin(Vue) {
  Vue.prototype.$set = set
}
```

```js
/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
export function set (target: Array<any> | Object, key: any, val: any): any {
  if (process.env.NODE_ENV !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(`Cannot set reactive property on undefined, null, or primitive value: ${(target: any)}`)
  }

  // 数组
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    // 修改数组长度 避免索引大于数组长度导致 splice 错误
    target.length = Math.max(target.length, key)
    target.splice(key, 1, val)
    return val
  }

  // 如果 key 已经存在 则直接赋值
  if (key in target && !(key in Object.prototype)) {
    target[key] = val
    return val
  }
  const ob = (target: any).__ob__
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    )
    return val
  }
  // target 不是响应式数据  直接赋值
  if (!ob) {
    target[key] = val
    return val
  }

  // 响应式处理
  defineReactive(ob.value, key, val)
  // 派发更新
  ob.dep.notify()
  return val
}
```