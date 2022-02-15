# 伪类

## first-child first-of-type nth-child 

- p:first-child  如果第一个元素不是 p 标签，则样式不生效

```css
 p:first-child {
    color: red;
  }
```

```pug 
<!-- 生效 -->
div.box1
  p first
  span i am span 
  p 111

<!-- 不生效 -->
div.box1
  span i am span 
  p 111
```

- p:first-of-type 选择在父元素中第一个出现的`<p>`，而不管其在兄弟内的位置如何

```css
p:first-of-type {
  color: red;
}
```

```pug 
<!-- 生效 -->
div.box1
  p first
  span i am span 
  p 111

<!-- 生效 -->
div.box1
  span i am span 
  p 111
```

- 中间有其他标签（如下 `ul`） 规则也如上

```pug
div.box2 
  ul 
    p aa
    li 1
    li 2
    li 3
```

- `nth-child` 子元素如果不是指定标签如`li`，也会计算在内，如下 `2` 是红色，
  但如果指定的标签不是li，则无效

```css
.box3 {
  li:nth-child(3) {
    color: red;
  }

  /* 因为指定1不是 li 标签  所以不生效 */
  li:nth-child(1) {
    color: red;
  }
}
```

```pug
div.box3
  ul 
    p aa
    li 1
    li 2
    li 3
```

## not

- 如果不是指定标签 不生效 

```css
.box4 {
  p:not(:last-child) {
    color: red;
  }

  p:not(.p1) {
    font-size: 30px;
  }
}
```

```pug
.box4
  //- span 无效果
  span span 
  //- 红色 
  p.p1 11
  //- 红色 30px
  p.p2 22
  //- 黑色 30px
  p 33
```

```html
<div class="not-main">
  <p>not 伪类 无class </p>
  <p class="not-p">not 伪类 有class </p>
  <div>not 伪类 div </div>
</div>
<div class="not-main-2">
  <span>1111</span>
  <span>2222</span>
  <span>3333</span>
</div>
```
```css
/* 设置非div元素样式 */
.not-main p:not(div) {
  font-size: 24px;
  color: #000;
}
/* 非 class 为 not-p 的元素 */
.not-main p:not(.not-p) {
  font-size: 18px;
  color: bisque;
}
/* 排除多个class 逗号分隔 */
.not-main p:not(.not-p,.not-span) {
  font-size: 18px;
  color: bisque;
}

/* 非第一个和最后一个元素 不可写为 span:not(:first-child, :last-child) */
.not-main-2 span:not(:first-child):not(:last-child) {
  color: chocolate;
  font-size: 20px;
}
```

## CSS3 新增伪类 

- p:first-of-type 

- p:last-of-type

- p:only-of-type 容器里 只有一个 li 元素 不关注是否存在其他元素 有多个 li 元素则不生效

```pug 
//- 有多个 p 则不生效
.box1
  //- p 111
  span 222
  p 333
```

```css
.box1 {
  p:only-of-type {
    color: red;
  }
}
```

- p:only-child 有且只有一个 p 元素 不包含其他元素 才生效

```pug
//- 有个元素不生效
.box2
  p 444
  //- span 555
```
```css
.box2 {
  p:only-child {
    color: blue;
  }
}
```


- p:nth-child(2)

- :disabled 

- :enabled 

<button class="btn-disabled" disabled>按钮</button>
<button class="btn-enabled">按钮2</button>

- checked

