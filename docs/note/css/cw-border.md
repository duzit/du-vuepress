# 功勋卓越的 border 属性

- [实例参考](https://github.com/duzit/du-css/blob/master/src/cssword/01.border.html)

## border-width

- thin 1px

- medium 默认值 3px

- thick 4px

**为什么 border 默认宽度是 3px**
- 因为 border-style: double 至少3px才会有效果

## border-style 

- 默认值是none 

- 属性值 none solid dashed dotted double 

## border-color

- 如果没有指定颜色值，使用当前元素的 color 计算值

## border与透明边框技巧

- 右下方 background 定位的技巧，实现宽度不固定的容器，在距离右侧边缘50px的位置设置背景图片

::: tip
background 背景图片是相对于 padding box 定位的，background-position 的位置计算不会把 border-width 计算在内
:::

```css
.box5 {
  width: auto;
  background: url(../../imgs/img.png) no-repeat;
  border: 1px solid;
  border-right: 50px solid transparent;
  background-position: 100% 50%;
}
```

- 优雅的增加点击区域大小

```css
.box6 {
  width: 20px;
  height: 20px;
  background: rebeccapurple;
  border: 10px solid red;
  cursor: pointer;
}
```

- 三角图形绘制

```css
.box7 {
  width: 0;
  height: 0;
  border: 10px solid;
  border-color: rebeccapurple transparent transparent;
}

.box8 {
  width: 0;
  height: 0;
  border-width: 20px 10px;
  border-style: solid;
  border-color: rebeccapurple rebeccapurple transparent transparent;
}
```