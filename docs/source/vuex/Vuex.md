# Vuex 

## 概念

- 专为 Vue.js 应用程序开发的状态管理模式
- 集中式存储管理应用的左右组件的状态 
- 响应式

- [参考1](https://mp.weixin.qq.com/s?__biz=MzA5MjQwMzQyNw==&mid=2650744584&idx=1&sn=b14f8a762f132adcf0f7e3e075ee2ded&chksm=88662484bf11ad922ed27d45873af838298949eea381545e82a511cabf0c6fc6876a8370c6fb&scene=21#wechat_redirect)  
  或者 [github](https://github.com/lxchuan12/vuex-analysis)

- [参考2美团](https://tech.meituan.com/2017/04/27/vuex-code-analysis.html)

## Vue.use(Vuex)

- 安装 Vue.js 插件，如果插件是一个对象。必须提供 install 方法，如果插件是一个函数，它会被当做install方法。  
  install 方法调用时，会将 Vue 当做参数传入，该方法需要在调用 new Vue() 之前被调用  
  当 install 方法被同一个插件多次调用，插件只会被安装一次。

## 问题思考

1. 使用Vuex只需执行 Vue.use(Vuex)，并在Vue的配置中传入一个store对象的示例，store是如何实现注入的？
2. state内部是如何实现支持模块配置和模块嵌套的？
3. 在执行dispatch触发action（commit同理）的时候，只需传入（type, payload），action执行函数中第一个参数store从哪里获取的？
4. 如何区分state是外部直接修改，还是通过mutation方法修改的？
5. 调试时的“时空穿梭”功能是如何实现的？

## 目录介绍

```sh
| -- src 
| -- | -- module # 提供 module 对象 与 module 对象树的创建功能
| -- | -- | -- | module-collection.js
| -- | -- | -- | module.js
| -- | -- plugins # 提供开发辅助插件，如 时空穿梭， state 修改记录功能等
| -- | -- | -- | devtool.js
| -- | -- | -- | logger.js
| -- helpers.js # 提供 actions mutations getters 的查找api
| -- index.js # 入口文件
| -- minxin.js # 提供 store 在 Vue 实例上装载注入
| -- store.js # 提供 store 各 module 构建安装
| -- util.js # 工具方法
```

## 入口 

- vuex/src/index.js

```js
import { Store, install } from './store'
import { mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers } from './helpers'

export default {
  Store,
  install,
  version: '__VERSION__',
  mapState,
  mapMutations,
  mapGetters,
  mapActions,
  createNamespacedHelpers
}
```

## 装载注入 

- 使用例子

```js
// store.js
import Vue from 'vue'
import Vuex from 'vuex'

// 安装插件 调用 install 方法 或直接 install()
Vue.use(Vuex)

const store = new Vuex.Store({})

export default store

// main.js

new Vue({
  el: '#app',
  store
  // ...
})
```

- install 方法 vuex/src/store.js 

```js
export function install (_Vue) {
  // Vue 已经存在并且相等，说明已经Vuex.use过
  if (Vue && _Vue === Vue) {
    // 非生产环境报错，vuex已经安装，代码继续执行
    if (process.env.NODE_ENV !== 'production') {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      )
    }
    return
  }
  Vue = _Vue
  applyMixin(Vue)
}
```

- applyMixin(Vue)  
> 将初始化Vue根组件时传入store设置到 `this.$store` 上，子组件从其父组件上获取 `$store` 属性，  
  层层嵌套进行设置，在任意组件上都能找到 store 对象  

```js
export default function (Vue) {
  const version = Number(Vue.version.split('.')[0])

  if (version >= 2) {
    // 合并选项后 beforeCreate 是数组里函数的形式  [func,  func]
    // 最后调用循环遍历这个数组，调用这些函数，这是一种函数与函数合并的解决方案。
    Vue.mixin({ beforeCreate: vuexInit })
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    const _init = Vue.prototype._init
    Vue.prototype._init = function (options = {}) {
      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit
      _init.call(this, options)
    }
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    console.log('vuexInit')
    const options = this.$options
    // store 注入
    // 使得每个Vue实例下 都有 $store 这个对象（Store 实例，包含一系列方法和属性），且是同一个对象。
    // 先是判断 options.store 也就是 这个
    /*
    const store = new Vuex.Store();
    new Vue({
      store,
    })
    */
    // store injection
    if (options.store) {
      console.log('options.store')
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store
    } else if (options.parent && options.parent.$store) {
      console.log('options.parent.$store')
      this.$store = options.parent.$store
    }
  }
}
```

## 数据初始化

-  vuex/src/store.js

```js
export class Store {
  constructor (options = {}) {
    // 环境判断
    // 如果是 cdn script 引入vuex插件，则自动安装vuex插件，不需要用Vue.use(Vuex)来安装
    if (!Vue && typeof window !== 'undefined' && window.Vue) {
      install(window.Vue)
    }

    // 不是生产环境
    // 断言函数
    /**
     * 条件 断言 不满足直接抛出错误
      export function assert (condition, msg) {
        if (!condition) throw new Error(`[vuex] ${msg}`)
      }
     */
    if (process.env.NODE_ENV !== 'production') {
      // 可能有读者会问：为啥不用console.assert，console.assert函数报错不会阻止后续代码执行
      // 必须使用Vue.use(Vuex) 创建 store 实例
      assert(Vue, `must call Vue.use(Vuex) before creating a store instance.`)
      // 当前环境不支持Promise，报错：vuex需要Promise polyfill
      assert(typeof Promise !== 'undefined', `vuex requires a Promise polyfill in this browser.`)
      // Store 函数必须使用new操作符调用
      assert(this instanceof Store, `store must be called with the new operator.`)
    }

    // store internal state
    // store 实例对象 内部的 state
    this._committing = false
    // 用来存放处理后的用户自定义的actoins
    /**
     * 提一下 Object.create(null) 和 {} 的区别。前者没有原型链，后者有。
        即 Object.create(null).__proto__ 是 undefined
        ({}).__proto__ 是 Object.prototype
     */
    this._actions = Object.create(null)
    // 用来存放 actions 订阅
    this._actionSubscribers = []
    // 用来存放处理后的用户自定义的mutations
    this._mutations = Object.create(null)
    // 用来存放处理后的用户自定义的 getters
    this._wrappedGetters = Object.create(null)
    // 模块收集器，构造模块树形结构
    this._modules = new ModuleCollection(options)
    // 用于存储模块命名空间的关系
    this._modulesNamespaceMap = Object.create(null)
    // 订阅
    this._subscribers = []
    // 用于使用 $watch 观测 getters
    this._watcherVM = new Vue()
    // 用来存放生成的本地 getters 的缓存
    this._makeLocalGettersCache = Object.create(null)

    // bind commit and dispatch to self
    // 给自己 绑定 commit 和 dispatch
    const store = this
    const { dispatch, commit } = this
    // 为何要这样绑定 ?
    // 说明调用commit和dispach 的 this 不一定是 store 实例
    // 这是确保这两个函数里的this是store实例
    this.dispatch = function boundDispatch (type, payload) {
      return dispatch.call(store, type, payload)
    }
    this.commit = function boundCommit (type, payload, options) {
      return commit.call(store, type, payload, options)
    }

    // ...

    // 初始化 根模块
    // 并且也递归的注册所有子模块
    // 并且收集所有模块的 getters 放在 this._wrappedGetters 里面
    installModule(this, state, [], this._modules.root)

    // initialize the store vm, which is responsible for the reactivity
    // (also registers _wrappedGetters as computed properties)
    // 初始化 store._vm 响应式的
    // 并且注册 _wrappedGetters 作为 computed 的属性
    resetStoreVM(this, state)

    // ...
  }
}
```

## module树构造

- vuex/src/module/module-collection.js   
> 主要将传入的 options 对象 整个构造为一个 module 对象，并循环调用 `this.register()` 为其中的 modules 属性进行模块注册，  
  使其成为 module 对象，最后 options 对象被构造成一个完整的组件树。

```js
export default class ModuleCollection {
  constructor (rawRootModule) {
    // register root module (Vuex.Store options)
    // 注册根模块 参数 rawRootModule 也就是 Vuex.Store 的 options 参数
    // 未加工过的模块（用户自定义的），根模块
    this.register([], rawRootModule, false)
  }

  /**
   * 注册模块
   * @param {Array} path 路径
   * @param {Object} rawModule 原始未加工的模块
   * @param {Boolean} runtime runtime 默认是 true
   */
  register (path, rawModule, runtime = true) {
    // 非生产环境 断言判断用户自定义的模块是否符合要求
    if (process.env.NODE_ENV !== 'production') {
      assertRawModule(path, rawModule)
    }

    const newModule = new Module(rawModule, runtime)
    if (path.length === 0) {
      this.root = newModule
    } else {
      const parent = this.get(path.slice(0, -1))
      parent.addChild(path[path.length - 1], newModule)
    }

    // register nested modules
    // 递归注册子模块
    if (rawModule.modules) {
      forEachValue(rawModule.modules, (rawChildModule, key) => {
        this.register(path.concat(key), rawChildModule, runtime)
      })
    }
  }
}
```

## dispatch 和 commit 设置

- 使用示例  
> 因为支持两种形式调用 所以 dispatch() commit() 首先会调用 `unifyObjectStyle()` 格式化参数

```js
// 以载荷形式分发
store.dispatch('incrementAsync', {
  amount: 10
})

// 以对象形式分发
store.dispatch({
  type: 'incrementAsync',
  amount: 10
})

store.commit('increment', {
  amount: 10
})

store.commit({
  type: 'increment',
  amount: 10
})
```

```js
// bind commit and dispatch to self
// 给自己 绑定 commit 和 dispatch
const store = this
const { dispatch, commit } = this
// 为何要这样绑定 ?
// 说明调用commit和dispach 的 this 不一定是 store 实例
// 这是确保这两个函数里的this是store实例
this.dispatch = function boundDispatch (type, payload) {
  return dispatch.call(store, type, payload)
}
this.commit = function boundCommit (type, payload, options) {
  return commit.call(store, type, payload, options)
}

commit (_type, _payload, _options) {
  // check object-style commit
  // 统一成对象风格
  /**
  * 支持多种方式
  * 最后返回  { type, payload, options }
    *  store.commit('increment', {
    *    count: 10
    *  })
    *  // 对象提交方式
    *  store.commit({
    *    type: 'increment',
    *    count: 10
    *  })
    */
  const {
    type,
    payload,
    options
  } = unifyObjectStyle(_type, _payload, _options)

  const mutation = { type, payload }
  // 取出处理后的用户定义 mutation
  const entry = this._mutations[type]
  if (!entry) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(`[vuex] unknown mutation type: ${type}`)
    }
    return
  }

  // 专用修改state方法，其他修改state方法均是非法修改
  this._withCommit(() => {
    entry.forEach(function commitIterator (handler) {
      handler(payload)
    })
  })

  // 订阅者函数遍历执行，传入当前的mutation对象和当前的state
  this._subscribers.forEach(sub => sub(mutation, this.state))

  if (
    process.env.NODE_ENV !== 'production' &&
    options && options.silent
  ) {
    console.warn(
      `[vuex] mutation type: ${type}. Silent option has been removed. ` +
      'Use the filter functionality in the vue-devtools'
    )
  }
}

// dispatch
dispatch (_type, _payload) {
  // check object-style dispatch
  // 获取到type和payload参数
  const {
    type,
    payload
  } = unifyObjectStyle(_type, _payload)

  // 声明 action 变量 等于 type和payload参数
  const action = { type, payload }
  // 入口，也就是 _actions 集合
  const entry = this._actions[type]
  // 如果不存在
  if (!entry) {
    // 非生产环境报错，匹配不到 action 类型
    if (process.env.NODE_ENV !== 'production') {
      console.error(`[vuex] unknown action type: ${type}`)
    }
    // 不往下执行
    return
  }

  try {
    this._actionSubscribers
      .filter(sub => sub.before)
      .forEach(sub => sub.before(action, this.state))
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[vuex] error in before action subscribers: `)
      console.error(e)
    }
  }

  const result = entry.length > 1
    ? Promise.all(entry.map(handler => handler(payload)))
    : entry[0](payload)

  return result.then(res => {
    try {
      this._actionSubscribers
        .filter(sub => sub.after)
        .forEach(sub => sub.after(action, this.state))
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[vuex] error in after action subscribers: `)
        console.error(e)
      }
    }
    return res
  })
}
```

## state 修改方法

- 所有触发 mutation 进行修改 state 的操作都要经过 _withCommit()，统一管理 state 

```js
// 专用修改state方法，其他修改state方法均是非法修改
this._withCommit(() => {
  entry.forEach(function commitIterator (handler) {
    handler(payload)
  })
})

// 内部方法 _withCommit _committing 变量 主要是给严格模式下
// enableStrictMode 函数 监控是否是通过这个函数修改，不是则报错。
_withCommit (fn) {
  // 存储committing 变量
  const committing = this._committing
  // committing 为 true
  this._committing = true
  // 执行参数 fn 函数
  fn()
  // committing 为 true
  this._committing = committing
}
```

## module 安装

- 初始化组件树根组件，注册所有子组件，并将所有的 getters 存储到 this._wrappedGetters 中

```js
function installModule (store, rootState, path, module, hot) {
  // 是根模块
  const isRoot = !path.length
  // 命名空间 字符串
  /**
   * getNamespace (path) {
      let module = this.root
      return path.reduce((namespace, key) => {
        module = module.getChild(key)
        return namespace + (module.namespaced ? key + '/' : '')
      }, '')
    }
  */
  const namespace = store._modules.getNamespace(path)

  // register in namespace map
  /**
   * 
   * 注册在命名空间的map对象中。
   * 模块命名控件为 true 执行以下代码
   * 主要用于在 helpers 辅助函数，根据命名空间获取模块
   * function getModuleByNamespace (store, helper, namespace) {
      // _modulesNamespaceMap 这个变量在 class Store 中
      const module = store._modulesNamespaceMap[namespace]
      if (process.env.NODE_ENV !== 'production' && !module) {
        console.error(`[vuex] module namespace not found in ${helper}(): ${namespace}`)
      }
      return module
    }
   */
  if (module.namespaced) {
    // 模块命名空间map对象中已经有了，开发环境报错提示重复
    if (store._modulesNamespaceMap[namespace] && process.env.NODE_ENV !== 'production') {
      console.error(`[vuex] duplicate namespace ${namespace} for the namespaced module ${path.join('/')}`)
    }
    // module 赋值给 _modulesNamespaceMap[namespace]
    store._modulesNamespaceMap[namespace] = module
  }

  // set state
  // 不是根模块且不是热重载
  if (!isRoot && !hot) {
    // 获取父级的state
    const parentState = getNestedState(rootState, path.slice(0, -1))
    // 模块名称
    // 比如 cart
    const moduleName = path[path.length - 1]
    // state 注册
    store._withCommit(() => {
      if (process.env.NODE_ENV !== 'production') {
        if (moduleName in parentState) {
          console.warn(
            `[vuex] state field "${moduleName}" was overridden by a module with the same name at "${path.join('.')}"`
          )
        }
      }
      /**
       * 最后得到的是类似这样的结构且是响应式的数据 比如
       *
       Store实例：{
        // 省略若干属性和方法
        // 这里的state是只读属性 可搜索 get state 查看
        state: {
          cart: {
            checkoutStatus: null,
            items: []
          }
        }
       }
       *
       */
      // 将 state 设置到父级state对象 moduleName 属性中
      Vue.set(parentState, moduleName, module.state)
    })
  }

  // module.context  这个赋值主要是给 helpers 中 mapState、mapGetters、mapMutations、mapActions四个辅助函数使用的。
  //  生成本地的dispatch、commit、getters和state
  //  主要作用就是抹平差异化，不需要用户再传模块参数
  const local = module.context = makeLocalContext(store, namespace, path)

  /**
   * 循环遍历注册 mutation
   * module.forEachMutation 函数 ===== forEachAction 和 forEachGetter 也类似
   * 定义在 class Module 里
   * _rawModule.mutations 是用户定义的未加工的mutations
    * forEachMutation (fn) {
    *   if (this._rawModule.mutations) {
    *     forEachValue(this._rawModule.mutations, fn)
    *   }
    * }
    */
  module.forEachMutation((mutation, key) => {
    const namespacedType = namespace + key
    registerMutation(store, namespacedType, mutation, local)
  })

  // 循环遍历注册 action
  module.forEachAction((action, key) => {
    const type = action.root ? key : namespace + key
    const handler = action.handler || action
    registerAction(store, type, handler, local)
  })

  // 循环遍历注册 getter
  module.forEachGetter((getter, key) => {
    const namespacedType = namespace + key
    registerGetter(store, namespacedType, getter, local)
  })

  /**
   * 注册子模块
   * forEachChild (fn) {
        forEachValue(this._children, fn)
      }
   */
  // 递归调用自身
  module.forEachChild((child, key) => {
    installModule(store, rootState, path.concat(key), child, hot)
  })
}
```

## store._vm组件设置

- Vuex 是一个名为 store 的 vm 组件，所有的配置 actions mutations state getters 都是组件的属性

```js
function resetStoreVM (store, state, hot) {

  // 存储一份老的Vue实例对象 _vm
  const oldVm = store._vm

  // bind store public getters
  // 绑定 store.getter
  store.getters = {}
  // reset local getters cache
  // 重置 本地getters的缓存
  store._makeLocalGettersCache = Object.create(null)
  // 注册时收集的处理后的用户自定义的 wrappedGetters
  const wrappedGetters = store._wrappedGetters
  // 声明 计算属性 computed 对象
  const computed = {}
  // 遍历 wrappedGetters 赋值到 computed 上
  forEachValue(wrappedGetters, (fn, key) => {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    /**
     * partial 函数
     * 执行函数 返回一个新函数
        export function partial (fn, arg) {
          return function () {
            return fn(arg)
          }
        }
     */
    computed[key] = partial(fn, store)
    // getter 赋值 keys
    Object.defineProperty(store.getters, key, {
      get: () => store._vm[key],
      // 可以枚举
      enumerable: true // for local getters
    })
  })

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  // 使用一个 Vue 实例对象存储 state 树
  // 阻止警告 用户添加的一些全局mixins

  // 声明变量 silent 存储用户设置的静默模式配置
  const silent = Vue.config.silent
  // 静默模式开启
  Vue.config.silent = true
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed
  })
  // 把存储的静默模式配置赋值回来
  Vue.config.silent = silent

  // enable strict mode for new vm
  // 开启严格模式 执行这句
  // 用$watch 观测 state，只能使用 mutation 修改 也就是 _withCommit 函数
  if (store.strict) {
    enableStrictMode(store)
  }

  // 如果存在老的 _vm 实例
  if (oldVm) {
    // 热加载为 true
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      // 设置  oldVm._data.$$state = null
      store._withCommit(() => {
        oldVm._data.$$state = null
      })
    }
    // 实例销毁
    Vue.nextTick(() => oldVm.$destroy())
  }
}
```