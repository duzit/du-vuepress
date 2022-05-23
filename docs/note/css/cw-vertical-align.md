# vertical-align 

- [CodePen](https://codepen.io/duzit/pen/WNMOgWQ)

## 属性值

- 线类，baseline top middle bottom 
- 文本类，text-top text-bottom 
- 上标下标类， sub super 
- 数值百分比类， 20px 20% 2em 

```pug
.box1 
  span#elAlign 字符x
  img(
    src="https://s.cn.bing.net/th?id=OHR.ApisMellifera_ZH-CN8078623367_1920x1080.jpg&rf=LaDigue_1920x1080.jpg",
    height="100",
    alt=""
  )

span vertial-align:
select#select(onchange="handleChange(this.value)")
  option(value="10px") 10px
  option(value="-10px") -10px
  option(value="1em") 1em
  option(value="50%") 50%
  option(value="-50%") -50%
```

```scss
.box1 {
  border: 1px solid;

  span {
    vertical-align: baseline;
  }
}
```

```js
const handleChange = (v) => {
  const elSel = document.getElementById("select");
  const elAlign = document.getElementById("elAlign");
  if (elAlign && elSel) {
    elAlign.style.verticalAlign = v;
  }
};
```

## 作用的前提

- 只能应用于内联元素和 display: table-cell 的元素，即只作用于 display 值为 inline inline-block inline-table table-cell 的元素

::: tip
浮动和绝对定位会让元素块状化，从而导致 vertical-align 无效
:::

### 设置 line-height 才会有效的情况

```pug 
.box2 
  img(
    src="https://s.cn.bing.net/th?id=OHR.ApisMellifera_ZH-CN8078623367_1920x1080.jpg&rf=LaDigue_1920x1080.jpg",
    height="100",
    alt=""
  )
```

```scss
.box2 {
  background-color: #666;
  height: 200px;
  // 设置 line-height 才会有效  幽灵空白节点
  line-height: 200px; 
  margin-top: 20px;
  
  img {
    height: 100px;
    vertical-align: middle;
  }
}
```

### vertical-align 起作用的是 table-cell 元素自身

```pug 
.box3
  img(
    src="https://s.cn.bing.net/th?id=OHR.ApisMellifera_ZH-CN8078623367_1920x1080.jpg&rf=LaDigue_1920x1080.jpg",
    height="100",
    alt=""
  )
```

```scss
.box3 {
  background-color: #333;
  height: 200px;
  display: table-cell;
  // 设置在自身元素上才有效
  vertical-align: middle;
  
  img {
    height: 100px;
    // 设置在 img 元素上没有效果
    // vertical-align: middle;
  }
}
```

## vertical-align 与 line-height 的关系

- vertical-align 的百分比是相对于 line-height 计算的

### 容器高度不等于行高 

- 例一，如下高度是 34px ，而 line-height 是 32px

- 原因是，字符`x`构成一个 匿名内联盒子，`文字文字123`构成内联盒子，由于都受 line-height: 32px 影响，
因此这两个”内联盒子“的高度都是32px，关键点，**对字符而言，font-size越大，字符的基线位置就越往下**，因为文字默认是
基线对齐，所以**当字号大小不一样的文字放在一起时，彼此就会发生上下位移，如果位移距离足够大，就会超过行高的限制**，而导致
意料之外的高度

```pug 
.box4 x
  span 文字文字123
```

```scss
.box4 {
  margin-top: 20px;
  line-height: 32px;
  
  span {
    font-size: 24px
  }
}
```

**解决方法**

- 幽灵空白节点的字号和 span 元素一样大

```pug
.box5 x
  span 文字文字123
```

```scss
.box5 {
  margin-top: 20px;
  line-height: 32px;
  font-size: 24px;
  
  span {
    font-size: 24px;
  }
}
```

- 改变垂直对齐方式

```scss
.box6 {
  margin-top: 20px;
  line-height: 32px;
  
  span {
    font-size: 24px;
    vertical-align: top;
  }
}
```