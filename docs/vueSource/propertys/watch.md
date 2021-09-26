# Watch 

- Vue 实例初始化 initState 中初始化，在 initComputed 之后

```js
if (opts.watch && opts.watch !== nativeWatch) {
  initWatch(vm, opts.watch)
}

// 拿到 watch 对象的 handler 
function initWatch (vm: Component, watch: Object) {
  for (const key in watch) {
    const handler = watch[key]
    if (Array.isArray(handler)) {
      for (let i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i])
      }
    } else {
      createWatcher(vm, key, handler)
    }
  }
}

function createWatcher (
  vm: Component,
  expOrFn: string | Function,
  handler: any,
  options?: Object
) {
  if (isPlainObject(handler)) {
    options = handler
    handler = handler.handler
  }
  if (typeof handler === 'string') {
    handler = vm[handler]
  }
  return vm.$watch(expOrFn, handler, options)
}

Vue.prototype.$watch = function (
  expOrFn: string | Function,
  cb: any,
  options?: Object
): Function {
  const vm: Component = this
  if (isPlainObject(cb)) {
    return createWatcher(vm, expOrFn, cb, options)
  }
  options = options || {}
  options.user = true
  const watcher = new Watcher(vm, expOrFn, cb, options)
  if (options.immediate) {
    const info = `callback for immediate watcher "${watcher.expression}"`
    pushTarget()
    invokeWithErrorHandling(cb, vm, [watcher.value], vm, info)
    popTarget()
  }
  return function unwatchFn () {
    watcher.teardown()
  }
}
```

## 初始流程

- initWatch 拿到 watch 对象的 handler ，如果 handler 是数组则遍历 ，然后调用 createWatcher

- createWatcher 中判断 如果 handler 是纯对象，则重新赋值 handler 和 赋值 options 
```js
// 纯对象
if (isPlainObject(handler)) {
  options = handler
  handler = handler.handler
}

watch: {
  info: {
    handler: function() {},
    deep: true,
    immediate: true
  }
}
```

- 然后执行 vm.$watch ， $watch 是在 stateMixin 中定义在 Vue 实例上。  
  vm.$watch 调用 `new Watcher()` 实例化一个 watcher，此时 `options.user = true`，   
  说明 watcher 是一个 `user watcher`。   
  如果 `options.immediate` 为 true ，则会先执行一次 `cb()`

## Watcher Options

- `deep` `user` `sync` `lazy`

```js
// options
if (options) {
  this.deep = !!options.deep
  this.user = !!options.user
  this.lazy = !!options.lazy
  this.sync = !!options.sync
  this.before = options.before
} else {
  this.deep = this.user = this.lazy = this.sync = false
}
```

- deep 监听对象内部的变化 

```js
watch: {
  info: {
    handler: function() {},
    deep: true
  }
}

// 源码
if (this.deep) {
  traverse(value) // 深层递归遍历
}
```

- user `user watcher` 

```js
// info 即 user watcher
watch: {
  info(val, old) {}
}
```

- lazy `computed watcher`

```js
// computed watcher
computed: {
  result() {
    return `${this.name}-${this.age}`
  }
}
```

- sync  

> 当响应式数据发生变化时 触发 `watcher.update() ` ，只是把这个 watcher 推送到一个队列中，  
  在 nextTick 才会真正执行 watcher 的回调函数，  
  而一旦设置了 `sync` 就可以在当前 `tick` 同步执行 watcher 的回调函数

```js
/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true
  } else if (this.sync) {
    this.run()
  } else {
    queueWatcher(this)
  }
}
```