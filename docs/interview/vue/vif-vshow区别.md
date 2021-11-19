# v-if v-show 区别

## 相同点  

- 控制元素显隐

## 不同

1. v-show 控制元素的 css （display），dom 元素还在， v-if 控制元素dom本身的添加或删除，
2. v-show 绑定值的改变不会触发生命周期，vif 会触发生命周期，销毁和重建的过程
3. vif 有更高的切换消耗，vshow 有更高的初始渲染消耗，vif相比vshow有更大的开销，直接操作dom节点的增加删除

```js
// v-show 
// src/platforms/web/runtime/directives/show.js
bind (el: any, { value }: VNodeDirective, vnode: VNodeWithData) {
  vnode = locateNode(vnode)
  const transition = vnode.data && vnode.data.transition
  const originalDisplay = el.__vOriginalDisplay =
    el.style.display === 'none' ? '' : el.style.display
  if (value && transition) {
    vnode.data.show = true
    enter(vnode, () => {
      el.style.display = originalDisplay
    })
  } else {
    // 操作 display
    el.style.display = value ? originalDisplay : 'none'
  }
},
```