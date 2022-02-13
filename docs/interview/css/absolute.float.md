# position: absolute 和 float 区别

## 相同点

- 对内联元素 设置 float 和 absolute 都会使其脱离文档流，并且可以设置其宽高

## 不同点

| absolute | float | 
| --- | --- |
| 位置是 相对于父元素中第一个 position: relative 的定位 | 相对于 BFC 的位置 |
| 会覆盖文档流中的其他元素 | 仍然会占据位置 | 

```pug
span float

span absolute

div.box1 float-block
```

```css 
span:first-child {
  float: right;
  width: 30px;
  height: 30px;
}

span:not(:first-child) {
  position: absolute;
  top: 20px;
  left: 30px;
}

/* 仍然会占有文档流位置 会在span float 的左边； margin-right 也会生效 */
.box1 {
  float: right;
  margin-right: 20px; 
}
```