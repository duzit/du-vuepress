# box-sizing 的理解

- 盒子模型 分为 标准盒模型（content-box） 和 IE盒模型（border-box）,
  元素的宽高表现根据模型类型不同而不同，content-box 不包括 border 和 padding，
  border-box 包括 border 和 padding，作用在border。

- 默认值 content-box 

- 盒尺寸的作用细节，width 的作用细节，改变了 width 作用的盒子

- 默认情况下， width 是作用的 content-box 上的，box-sizing 的作用是改变 width 的作用盒子。

- 主要属性： content-box (默认，width 作用在 content-box) 和 border-box (width 作用在 border-box)

```css
/* 宽度是 200px， content-box 宽度是 200 - 10 * 2 (border) - 10 * 2 (padding) = 160px */
.box-sizing {
  border: 10px solid;
  width: 200px;
  height: 100px;
  box-sizing: border-box;
  padding: 10px;
}

/* 宽度是 240px， content-box 宽度是 200px */
.box-sizing {
  border: 10px solid;
  width: 200px;
  height: 100px;
  box-sizing: content-box;
  padding: 10px;
}
```