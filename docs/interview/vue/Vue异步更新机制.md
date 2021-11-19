# Vue异步更新机制

- 核心是利用浏览器的异步任务队列实现的

- 当响应式数据更新后，会触发 dep.notify 通知所有的 watcher 执行 update 方法

```js
notify () {
  // stabilize the subscriber list first
  // 获取所有 watcher 
  const subs = this.subs.slice()
  if (process.env.NODE_ENV !== 'production' && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort((a, b) => a.id - b.id)
  }

  // 遍历执行 update
  for (let i = 0, l = subs.length; i < l; i++) {
    subs[i].update()
  }
}
```

 - watcher 类的 update 方法

 ```js
/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
update () {
  /* istanbul ignore else */
  if (this.lazy) {
    // computed 缓存复用逻辑 lazy 
    this.dirty = true
  } else if (this.sync) {
    // 同步执行 watch 选项参数传 sync 
    // 不塞入异步更新队列
    this.run()
  } else {
    // 正常更新走当前分支
    queueWatcher(this)
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
export function queueWatcher (watcher: Watcher) {
  const id = watcher.id
  // 根据 watcher id 判断是否在队列中，不重复入队
  if (has[id] == null) {
    has[id] = true
    // 全局 queue 队列未处于刷新状态 watcher 可入队
    if (!flushing) {
      queue.push(watcher)
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      // 全局 queue 处于刷新状态
      // 在单调递增序列找到当前id 的位置并进行插入操作
      let i = queue.length - 1
      while (i > index && queue[i].id > watcher.id) {
        i--
      }
      queue.splice(i + 1, 0, watcher)
    }
    // queue the flush
    if (!waiting) {
      waiting = true

      // 同步执行逻辑
      if (process.env.NODE_ENV !== 'production' && !config.async) {
        flushSchedulerQueue()
        return
      }
      // 将回调函数 flushSchedulerQueue 放入 callbacks 数组
      nextTick(flushSchedulerQueue)
    }
  }
}

/**
 * Flush both queues and run the watchers.
 */
// 更新 flushing 为 true 表示正在刷新队列 在此期间加入的 watcher 必须有序插入队列 保证单调递增
// 按照队列的 watcher.id 从小到大排序 保证先创建的先执行
// 遍历 watcher 队列 按序执行 watcher.before watcher.run 最后清除缓存 watcher
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow()
  // 标识正在刷新队列
  flushing = true
  let watcher, id

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort((a, b) => a.id - b.id)

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  // 未缓存长度是因为可能在执行 watcher 时加入 watcher
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index]
    if (watcher.before) {
      watcher.before()
    }
    id = watcher.id
    // 清楚缓存的 watcher 
    has[id] = null
    // 触发更新函数 如 updateComponent 或 执行用户的 watch 回调
    watcher.run()
    // in dev build, check and stop circular updates.
    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? `in watcher with expression "${watcher.expression}"`
              : `in a component render function.`
          ),
          watcher.vm
        )
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  const activatedQueue = activatedChildren.slice()
  const updatedQueue = queue.slice()

  // waiting = flushing = false 标识刷新队列结束 可以向浏览器的任务队列加入下一个 flushCallbacks
  resetSchedulerState()

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue)
  callUpdatedHooks(updatedQueue)

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush')
  }
}
 ```

 - watcher.run

 ```js
/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
// 执行实例化 watcher 传递的第二个参数 
// 更新旧值为新值
// 执行实例化 watcher 时传递第三个参数 用户传递的 watcher 回调
run () {
  if (this.active) {
    // 获取值 
    const value = this.get()
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      // 更新新值
      const oldValue = this.value
      this.value = value
      // 如果是项目传入的 watcher 则执行实例化传递的回调函数
      if (this.user) {
        const info = `callback for watcher "${this.expression}"`
        invokeWithErrorHandling(this.cb, this.vm, [value, oldValue], this.vm, info)
      } else {
        this.cb.call(this.vm, value, oldValue)
      }
    }
  }
}

/**
 * Evaluate the getter, and re-collect dependencies.
 */
// 执行 this.getter 重新收集依赖
// 重新收集依赖是因为触发更新  setter 中只做了响应观测 但没有依赖收集的操作 
// 所以 在更新页面时 会重新执行一次 render 函数 执行期间会触发读取操作 这时进行依赖收集
get () {
  pushTarget(this)
  let value
  const vm = this.vm
  try {
    value = this.getter.call(vm, vm)
  } catch (e) {
    if (this.user) {
      handleError(e, vm, `getter for watcher "${this.expression}"`)
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value)
    }
    popTarget()
    this.cleanupDeps()
  }
  return value
}
 ```