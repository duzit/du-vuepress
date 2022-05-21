# 内联元素的基石 line-height

- [CodePen](https://codepen.io/duzit/pen/KKQqveV)

- [Github](https://github.com/duzit/du-css/tree/master/src/cssword/02.line-height.html)

### 对于非替换元素的内联元素 其可视高度完全由 line-height 决定

```html
<!-- 高度 2px -->
<div class="box1">我的高度1</div>
<!-- 高度 18px -->
<div class="box2">我的高度2</div>
```

```css
.box1 {
  font-size: 14px;
  line-height: 0;
  border: 1px solid;
  background: #eee;
}

.box2 {
  font-size: 0;
  line-height: 16px;
  border: 1px solid;
  background: #eee;
}
```

### 行距与半行距

- 行距 = `line-height` - `font-size`

- 半行距 = 行距 / 2

### line-height 并不能影响替换元素(如图片的高度)？

```html
<div class="box3">
  <img 
    src="https://s.cn.bing.net/th?id=OHR.ApisMellifera_ZH-CN8078623367_1920x1080.jpg&rf=LaDigue_1920x1080.jpg" 
    height="100"
    alt="">
</div>
```

```css
.box3 {
  line-height: 200px;
}
```

- 如上，.box3 的高度是 200px，但并不是 line-height 把图片的高度变高了，而是把“幽灵空白节点”的高度变高了

- 图片是内联元素，会构成一个 “行框盒子“，每一个”行框盒子“前面都会有一个宽度为0的”幽灵空白节点“，其特性表现跟普通字符一模一样。

### 实现近似”垂直居中“

```html
<div class="box4">
  <div class="content">
    多行垂直居中....
  </div>
</div>
```

```css
.box4 {
  line-height: 100px;
  background-color: #666;
}

.box4 > .content {
  display: inline-block;
  line-height: 20px;
  margin: 0 20px;
  vertical-align: middle;
}
```

- display: inline-block 形成 行框盒子，从而使 vertical-align 起作用

### line-height 属性值

- 数值，line-height: 1.5 ， 最终值是与 font-size 相乘后的值

- 百分比，line-height: 150% ，最终值是与 font-size 相乘后的值

- 长度值，即带单位的值， line-height: 21px ，或者 line-height: 1.5em ，em 是相对于 font-size 的相对单位，最终值是与 font-size 相乘后的值

**三种属性的区别**

- 继承细节的差别，`数值`作为 line-height 属性值，所有子元素继承的都是这个值，`百分比` `长度值` 作为 line-height 属性值，所有子元素继承的是计算后的值

```html
<div class="box5">
  <h3>标题title</h3>
  <p>内容xxx</p>
</div>

<div class="box6">
  <h3>标题title</h3>
  <p>内容xxx</p>
</div>
```

```css 
.box5 {
  font-size: 14px;
  line-height: 1.5;
  border: 1px solid;
  padding: 10px;
}

.box5 > h3 {
  font-size: 32px;
}

.box5 > p {
  font-size: 20px;
}

.box6 {
  font-size: 14px;
  line-height: 150%;
  border: 1px solid;
  padding: 10px;
}

.box6 > h3 {
  font-size: 32px;
}

.box6 > p {
  font-size: 20px;
}
```

- `box6` 元素重叠的原因是 line-height 继承的是 font-size * line-heigh = 21px，而不是像 `box5` 继承的是 line-height: 1.5

### line-height 大值特性

```html
<div class="box7">
  <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius culpa officiis asperiores quas! Saepe non veniam nam recusandae ipsa placeat libero facilis illo officiis, vitae voluptate nemo tenetur molestias similique!</span>
</div>

<div class="box8">
  <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius culpa officiis asperiores quas! Saepe non veniam nam recusandae ipsa placeat libero facilis illo officiis, vitae voluptate nemo tenetur molestias similique!</span>
</div>
```

```css
.box7 {
  line-height: 100px;
}
.box7 span {
  line-height: 20px;
}

.box8 {
  line-height: 20px;
}
.box8 span {
  line-height: 100px;
}
```

- 如上例子， 假设文字只有1行，`box7` `box8` 的高度都是 100px（不包含 border），**无论内联元素 line-height 如何设置，最终父级元素的高度是由数值大的那个 line-height 决定**，原因跟 ”行框盒子“ 的 ”幽灵空白节点“有关（设置内联元素 display: inline-block 创建一个独立的 ”行框盒子“ ，行高不受”幽灵空白节点“干扰）

