# 全局 API 非兼容

## Vue2 new Vue() 

- 根 Vue 实例 ，从同一个Vue构造函数创建的每个根实例共享相同的全局配置 
- 更类似全局配置 很容易被污染

## Vue3 createApp

- 调用 `createApp` 返回一个应用实例

```js
import { createApp } from 'vue'
// cdn 构建版本
const { createApp } = Vue 

const app = createApp()
```

### Vue.prototype 替换为 config.globalProperties

```js
// vue2 
Vue.prototype.$http = () => {}

// vue3 
app.config.globalProperties.$http = () => {}
```

### Vue.component 替换为 app.component

```js
app.component('button-custom', {
  data: () => {
    return {
      count
    }
  },
  template: '<button @click="count++">Clicked {{ count }} times.</button>'
})
```

### Vue.directive 替换为 app.directive

```js
app.directive('focus', {
  mounted: el => el.focus()
})
```