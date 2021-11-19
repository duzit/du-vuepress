# Vue 响应式原理

## 3个步骤

- 数据劫持 依赖收集 派发更新

## 对象

- 遍历对象，通过 `Object.defineProperty(target, key, descriptor)` 为每个属性添加 `getter` 和 `setter`，进行`数据劫持`  
  `getter` 用于在数据读取时`依赖收集`，在对应的 `Dep` 中存储所有的 `watcher` ，  
  `setter` 则用于数据更新后通知所有的 `watcher` `派发更新`  

```js
/**
 * Define a reactive property on an Object.
 */
export function defineReactive (
  obj: Object,
  key: string,
  val: any,
  customSetter?: ?Function,
  shallow?: boolean
) {
  // 实例化一个 dep  一个 key 对应一个 dep
  const dep = new Dep()

  // 获取属性描述符
  const property = Object.getOwnPropertyDescriptor(obj, key)
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  const getter = property && property.get
  const setter = property && property.set
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key]
  }

  // 递归处理 val 为对象的情况 即处理嵌套对象
  let childOb = !shallow && observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    // 依赖收集
    get: function reactiveGetter () {
      const value = getter ? getter.call(obj) : val
      // Dep.target 是当前组件的渲染的 watcher 
      if (Dep.target) {
        // 将 dep 添加到 watcher 中
        // depend () {
        //   if (Dep.target) {
        //     Dep.target.addDep(this)
        //   }
        // }
        dep.depend()
        if (childOb) {
          // 嵌套对象依赖收集
          childOb.dep.depend()
          // 值为数组的情况 响应式处理
          if (Array.isArray(value)) {
            dependArray(value)
          }
        }
      }
      return value
    },
    // 派发更新
    set: function reactiveSetter (newVal) {
      // 获取旧值
      const value = getter ? getter.call(obj) : val
      // 判断新旧值是否相等
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter()
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) return
      // 替换旧值
      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      // 新值做响应式处理
      childOb = !shallow && observe(newVal)
      // 派发更新
      dep.notify()
    }
  })
}
```

## 数组

- 用数组增强的方式，覆盖原属性上默认的数组方法，保证在新增或删除时，通过 dep 通知所有的 watcher 派发更新

```js
/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

import { def } from '../util/index'

/**
 * Define a property.
 */
// export function def (obj: Object, key: string, val: any, enumerable?: boolean) {
//   Object.defineProperty(obj, key, {
//     value: val,
//     enumerable: !!enumerable,
//     writable: true,
//     configurable: true
//   })
// }

// 基于数组原型对象 新建一个对象
const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto)

const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  const original = arrayProto[method]
  // 在 arrayMethods 上定义 methodsToPatch 中的方法
  def(arrayMethods, method, function mutator (...args) {
    // 先执行原生方法
    const result = original.apply(this, args)
    const ob = this.__ob__
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    // 针对新增元素做响应式处理
    if (inserted) ob.observeArray(inserted)
    // notify change
    // 无论新增 删除 都派发更新
    ob.dep.notify()
    return result
  })
})
```