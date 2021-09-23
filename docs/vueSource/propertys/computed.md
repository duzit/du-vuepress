# Computed 

```js
const computedWatcherOptions = { lazy: true }

function initComputed (vm: Component, computed: Object) {
  // $flow-disable-line
  const watchers = vm._computedWatchers = Object.create(null)
  // computed properties are just getters during SSR
  const isSSR = isServerRendering()

  for (const key in computed) {
    const userDef = computed[key]
    // 获取 userDef 
    const getter = typeof userDef === 'function' ? userDef : userDef.get
    if (process.env.NODE_ENV !== 'production' && getter == null) {
      warn(
        `Getter is missing for computed property "${key}".`,
        vm
      )
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      )
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef)
    } else if (process.env.NODE_ENV !== 'production') {
      if (key in vm.$data) {
        warn(`The computed property "${key}" is already defined in data.`, vm)
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(`The computed property "${key}" is already defined as a prop.`, vm)
      } else if (vm.$options.methods && key in vm.$options.methods) {
        warn(`The computed property "${key}" is already defined as a method.`, vm)
      }
    }
  }
}

export function defineComputed (
  target: any,
  key: string,
  userDef: Object | Function
) {
  const shouldCache = !isServerRendering()
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef)
    sharedPropertyDefinition.set = noop
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop
    sharedPropertyDefinition.set = userDef.set || noop
  }
  if (process.env.NODE_ENV !== 'production' &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        `Computed property "${key}" was assigned to but it has no setter.`,
        this
      )
    }
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}

// 返回 computedGetter 即计算属性对应的 getter
function createComputedGetter (key) {
  return function computedGetter () {
    const watcher = this._computedWatchers && this._computedWatchers[key]
    if (watcher) {
      // watcher 中的 dirty === lazy
      // computed 中 options 默认 lazy = true
      if (watcher.dirty) {
        // This only gets called for lazy watchers
        // computed is lazy watchers
        watcher.evaluate()
      }
      if (Dep.target) {
        watcher.depend()
      }

      // this.value = this.lazy
      //   ? undefined
      //   : this.get()
      return watcher.value
    }
  }
}
```

## 初始化流程

- 遍历 `computed` 属性，获取 `getter` （区分属性定义方式 function 或 object）

- 非 `isSSR` ，为每一个 `getter` 创建一个 `watcher` （lazy: true）

- 判断 `computed` 的属性是否已经定义在 `data props methods` ，调用 `defineComputed(vm, key, userDef)`

- `defineComputed` 中调用 `Object.defineProperty(target, key, sharedPropertyDefinition)` 给计算属性的 `key` 值添加 `getter` 和 `setter`

## computed 属性的参数

```js
computed: {
  hi({ message }) {
    return message + ' world.'
  },
  // 参数是 Vue 实例
  params(params) {
    console.log(params);
    return '';
  }
}
```