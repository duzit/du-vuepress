# BFC 理解

- Block Formate Content 块级格式化上下文

- [codepen](https://codepen.io/duzit/pen/YzELjRM)

## 特性

- 创建的盒子是独立布局，不影响外部盒子的布局

- 同一个 BFC 中 两个相邻的块级盒子在水平或垂直方向会发生 margin 重叠，解决方法是设置其中一个子元素为BFC

- 可以包含浮动元素，父元素设置BFC  `overflow: hidden;` 不设置BFC的情况下 不会撑开子浮动元素

- BFC的区域不会与float box重叠，float 环绕功能 遇到BFC 不会生效

## 作用

- 自使用两栏布局

- 阻止元素被浮动元素覆盖

- 可以包含浮动元素

- 可以防止margin重叠

```pug 
.box1 
  // margin 塌陷
  .b.b1
  .b.b2

.box2 
  .b.b1
  // 重新构成BFC 解决 margin 塌陷
  .bfc
    .b.b2

.box3 
  // 子元素设置 float  box3 需设置BFC 才能撑起子元素
  .b.b31
  .b.b32

.box4
  // f1设置float 后 默认 p 文字会环绕 但当 p 设置了 BFC 后就不会环绕了   
  .f1
  p alfhakldjgakjdf;akljdg;kajdfklajdklfjgadskljgjfkaldjsf;klgjadgjakldjfk;aljdgk;ajdsg;kal金坷垃都放假啊； 安抚了健康大反馈了京东方；啊ad分类进卡里即可发放哈夫节啊；个安抚了健康发货联合国拉开发了接地开关哈联合国阿里第三个回复阿良好的噶非
```

```css
// div {
//   width: 300px;
//   height: 300px;
// }

.b {
  width: 100px;
  height: 100px;
}

.box1 {
  background: #666;

  .b1 {
    background: red;
    margin-bottom: 20px;
  }
  .b2 {
    background: yellow;
    margin-top: 30px;
  }
}

.box2 {
  // float: left;
  background: #999;

  .b1 {
    background: red;
    margin-bottom: 20px;
  }

  .bfc {
    overflow: hidden;
    .b2 {
      background: yellow;
      margin-top: 30px;
    }
  }
}

.box3 {
  overflow: hidden; // 构成 BFC 可以将 b31 b32 撑起来
  background: #333;
  border: 1px solid;
  .b31 {
    background: red;
    float: left;
  }
  .b32 {
    background: yellow;
    float: left;
  }
}

.box4 {
  .f1 {
    float: left;
    width: 30px;
    height: 20px;
    background: blue;
  }

  p {
    overflow: hidden;
  }
}
```