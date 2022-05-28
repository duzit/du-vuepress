# 幽灵空白节点 

## 带来的问题

- [实例效果参考](https://codepen.io/duzit/pen/RwQQPEJ)

- 图片下方有明显的空隙

```html
<div class="box1">
  x<img src="../../imgs/3.jpeg" alt="">
</div>
```
```css
.box1 {
  border: 1px solid;
}
```

## 原因

- 内联元素的对齐方式默认是基线(baseline)对齐，字母`x`的下边缘就是基线

## 解决方法

- 图片块状化

- 容器 line-height 足够小

- 容器 font-size 足够小

- 图片设置其他 vertical-align 属性值，top、middle、bottom