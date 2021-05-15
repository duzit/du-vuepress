## 为 Vue 单页面提速
[参考](https://mp.weixin.qq.com/s/5DAm7WvU9htzkdYGM5Tmkw)
### 功能组件  
```html
<template functional>  <div>...</div> </template>
```
* 代码需要修改

### 延迟加载组件
```js
components: {    
  ModalDialog: () => import('./ModalDialog.vue')  
}
```
### 延迟加载路由
```js
const ProjectList = () => import('@/components/ProjectList.vue');
```

### 使对象列表不可变
* Object.freeze()

### 评估运行时性能
* Vue项目中激活性能模式
```js
Vue.config.performance = process.env.NODE_ENV !== 'production'
```
* 打开浏览器，然后按 F12 键打开开发者控制台。切换到 Performance 选项卡，然后单击 Start Profiling。在 Chrome 中，“ Timings” 行显示重要标记，例如 “First Contentful Paint” 和 “First Meanfulful Paint” 时间。你应该尝试减少它们，以便你的用户可以尽快使用该网站。