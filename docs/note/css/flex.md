# 弹性布局 flex

- [flex 布局语法](http://ruanyifeng.com/blog/2015/07/flex-grammar.html)

## 特性 

- 任何容器都可以使用 flex 布局

- 行内元素也可以使用 flex 

## 概念

- 使用 Flex 布局的元素 称为 Flex `容器`，它所有的成员称为 Flex `项目`（item）

## `容器`属性

- `flex-direction` 决定主轴的方向 即 `项目` 的排列方向

```css
.box {
  flex-direction: row | row-reverse | column | column-reverse;
}
```

::: tip
row（默认值）：主轴为水平方向，起点在左端。  
row-reverse：主轴为水平方向，起点在右端。  
column：主轴为垂直方向，起点在上沿。  
column-reverse：主轴为垂直方向，起点在下沿。  
:::

- `flex-wrap` 默认 项目 排在一条轴线上，该属性定义如果一条轴线排不下如何换行

```css
.box{
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

- `flex-flow` flex-direction 属性和 flex-wrap 属性的简写形式

```css
.box {
  flex-flow: <flex-direction> || <flex-wrap>;
}
```

- `justify-content` `项目`在主轴上的对其方式 

```css
.box {
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
```

- `align-items` `项目`在交叉轴上的对齐方式

```css
.box {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```

- `align-content` 定义多条轴线的对齐方式，只有一条轴线则不起作用

```css
.box {
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```

## `项目`属性

::: tip
order  
flex-grow  
flex-shrink  
flex-basis  
flex  
align-self  
:::

- `order` 定义项目排列顺序 数值越小 排列越靠前 默认为 0 

```html
<div class='flex'>
  <div class='box mr20' style='order: 1'>111</div>
  <div class='box mr20' style='order: 0'>222</div>
</div>
```

<div class='flex'>
  <div class='box mr20' style='order: 1'>111</div>
  <div class='box mr20' style='order: 0'>222</div>
</div>

- `flex-grow` 定义`项目`的放大比例 默认 0 （即使有剩余空间 也不放大）

```css
.item {
  flex-grow: <number>; /* default 0 */
}
```

::: tip 
如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。
:::

```html
<div class='flex'>
  <div class='box mr20 flex-grow-1'>111</div>
  <div class='box mr20 flex-grow-2'>222</div>
  <div class='box flex-grow-1'>111</div>
</div>
```

<div class='flex'>
  <div class='box mr20 flex-grow-1'>111</div>
  <div class='box mr20 flex-grow-2'>222</div>
  <div class='box flex-grow-1'>111</div>
</div>

- `flex-shrink` 定义 `项目` 的缩小比例 默认为1，即如果空间不足，该项目将缩小

```css
.item {
  flex-shrink: <number>; /* default 1 */
}
```

::: tip
如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。
:::

- `flex-basis` 定义在分配多余空间之前 `项目`占据的主轴空间（main-size 宽高）

```css
.item {
  flex-basis: <length> | auto; /* default auto */
}
```

::: tip
它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。
:::

- `flex` 是 `flex-grow` `flex-shrink` `flex-basis` 的缩写，默认为 `0 1 auto`

::: tip
该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)
:::

- `align-self` 允许单个项目与其他项目不一样的对齐方式，可覆盖 `align-items` 属性

```css
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```

```html
<div class='flex align-item-center'>
  <div class='box mr20 '>111</div>
  <div class='box mr20 align-self-end'>222</div>
  <div class='box'>333</div>
</div>
```

<div class='flex align-item-center'>
  <div class='box mr20 '>111</div>
  <div class='box mr20 align-self-end'>222</div>
  <div class='box'>333</div>
</div>