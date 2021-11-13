# new Vue 做了什么

## 源码

- src/core/instance/index.js

- Vue 是一个 `function` 类，主要是执行了 `_init` 方法， 该方法定义在 `initMixin(Vue)`


```js
// 
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue
```

- initMixin

```js
// src/core/instance/init.js
export function initMixin (Vue: Class<Component>) {
  Vue.prototype._init = function (options?: Object) {
    const vm: Component = this
    // a uid
    vm._uid = uid++

    let startTag, endTag
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = `vue-perf-start:${vm._uid}`
      endTag = `vue-perf-end:${vm._uid}`
      mark(startTag)
    }

    // a flag to avoid this being observed
    vm._isVue = true
    // merge options
    // 是否子组件 非根组件 非 new Vue(options) 
    /*
      new Vue({
        el: '#app',
        data() {
          return ...
        }
      })
    */
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options)
    } else {
      // 根组件 
      // 合并全局配置到根组件上
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      // 新增 vm._renderProxy
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }
    // expose real self
    vm._self = vm
    // 初始化组件实例属性 $parent $children $refs $root
    initLifecycle(vm)
    // 注册组件上的事件 
    initEvents(vm)
    // $slots $createElement 
    // 通过 defineReactive 添加 $attrs $listeners
    initRender(vm)
    // 执行生命周期 beforeCreate 
    callHook(vm, 'beforeCreate')
    // 解析 inject 配置项 将配置项 key 添加到 vm 上 并做响应式处理
    initInjections(vm) // resolve injections before data/props
    // 处理 props data method watch computed 
    initState(vm)
    // 将配置的 provide 添加到 vm
    initProvide(vm) // resolve provide after data/props
    // 调用生命周期 created 方法
    callHook(vm, 'created')

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false)
      mark(endTag)
      measure(`vue ${vm._name} init`, startTag, endTag)
    }
    
    // 如果有 el 默认执行 $mount 挂载
    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
}
```