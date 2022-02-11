# display:none visibility:hidden

- [参考](https://juejin.cn/post/6844903686313869320)

## 相同点

- 控制元素显隐

- 无法获取焦点


## 不同点

| display none | visibility:hidden |
| --- | --- |
| 页面重绘 | 页面不会重绘 | 
| 无法获取DOM 事件无响应 | 可以事件响应 子元素可见情况下 设置hidden的父元素可以响应事件 | 
| 子元素同父元素 即使子元素设置非 none ，也不可见 | 子元素如果设置 visible ， 依然可见 |

```pug
.box1 
  p none1
  p none2

.box2
  p visibility1
  p visibility2

.box3 
  p ceshi1111

```

```css
.box1 {
  display: none;

  /* 即使设置 block 也不可见 */
  p {
    display: block;
  }
}

.box2 {
  visibility: hidden;
  background: #999;
  border: 1px solid #666;

  /* 子元素可见 */
  p {
    visibility: visible;
  }
}

/* hover 可响应 */
.box2:hover {
  visibility: visible;
}
```