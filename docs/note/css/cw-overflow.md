# 最佳结界 overflow

- 清除浮动影响的最适合的属性 overflow ，设置 `overflow: hidden`，利用 BFC 的结界特性彻底清除
浮动对外部或兄弟元素的影响

- [实例可参考 CodePen](https://codepen.io/duzit/pen/xxYYZOB)

## overflow 剪裁界线 border-box

- codepen box3

```pug
.box3
  img(src="	https://s.cn.bing.net/th?id=OHR.PurnululuNP_ZH-CN0102753224_1920x1080.jpg&rf=LaDigue_1920x1080.jpg", height=200)
```

```css
.box3 {
  width: 200px;
  height: 100px;
  border: 10px solid;
  padding: 20px;
  overflow: hidden;
}
```

## overflow 与锚点定位

1. codepen box1

- 本质是改变容器滚动高度（垂直滚动）实现

- 行为是由内而外的 

2. codepen box2 

- 设置了 overflow: hidden 的元素也是可以滚动的

3. codepen box4

- 选项卡(容器高度需固定)