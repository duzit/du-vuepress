# elementUI Collapse 折叠面板 过渡效果原理

## 源码地址

- `element-ui/packages/collapse/src/collapse.vue`

- `element-ui/packages/collapse/src/collapse-item.vue`

- `isActive` 控制面板显隐

```js
computed: {
  isActive() {
    // this.collapse.activeNames 是父组件（collapse.vue）中通过 provide 传递的
    // collapse-item 中的点击事件 触发父组件更新 this.dispatch('ElCollapse', 'item-click', this);
    return this.collapse.activeNames.indexOf(this.name) > -1;
  }
}
```

```html
<el-collapse-transition>
  <div
    v-show="isActive"
    :id="`el-collapse-content-${id}`"
    class="el-collapse-item__wrap"
    role="tabpanel"
    :aria-hidden="!isActive"
    :aria-labelledby="`el-collapse-head-${id}`">
    <div class="el-collapse-item__content">
      <slot />
    </div>
  </div>
</el-collapse-transition>
```

## 自定义组件 `el-collapse-transition`

- `element-ui/src/transitions/collapse-transition.js`

- 通过组件生命周期钩子，添加(addClass) 和 删除(removeClass) 类 `collapse-transition` ，
  然后改变元素的高度 `el.style.height` 等于 `el.scrollHeight` 或 0 

- 类定义地址 `element-ui/lib/theme-chalk/collapse.css`

```css
.collapse-transition {
  -webkit-transition: 0.3s height ease-in-out, 0.3s padding-top ease-in-out,
    0.3s padding-bottom ease-in-out;
  transition: 0.3s height ease-in-out, 0.3s padding-top ease-in-out,
    0.3s padding-bottom ease-in-out;
}
.horizontal-collapse-transition {
  -webkit-transition: 0.3s width ease-in-out, 0.3s padding-left ease-in-out,
    0.3s padding-right ease-in-out;
  transition: 0.3s width ease-in-out, 0.3s padding-left ease-in-out,
    0.3s padding-right ease-in-out;
}
```