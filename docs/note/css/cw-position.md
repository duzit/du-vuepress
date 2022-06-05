# position

- absolute 是非常独立的css属性值，其样式和行为表现不依赖任何css属性就可以完成

- 实现 icon 在图片的左上方，只需要设置 i 标签 `position: absolute` 即可，无需设置 .box1 `position: relative` 以及 i 的 `top left` 等属性

```pug
.box1 
  i icon
  img(src="	https://s.cn.bing.net/th?id=OHR.DragonBoat2022_ZH-…2392684688_1920x1080.jpg&rf=LaDigue_1920x1080.jpg", alt="", height=100)
```

```scss
.box1 {
  i {
    position: absolute;
  }
}
```

## position 与 text-align 

- position 会让元素块状化，而块状化元素是不会受内联元素对齐text-align 影响的，
但如下例子 text-align 可以改变 absolute 元素的位置。

> 原因是 幽灵空白节点 和 无依赖相对定位 共同作用的结果

```pug
.box4 
  img(
    src="	https://s.cn.bing.net/th?id=OHR.DragonBoat2022_ZH-…2392684688_1920x1080.jpg&rf=LaDigue_1920x1080.jpg",
    alt="",
    height=100
  )
```

```scss
.box4 {
  width: 300px;
  height: 200px;
  border: 1px solid;
  padding: 10px;
  text-align: center; // 有作用
  img {
    position: absolute;
  }
}
```

- 但此时图片并不是居中的，实际居中的是幽灵空白节点，设置 `img` `margin-left: -50px` 即可(50px 是图片宽度的一半)

## position 与 overflow

- 如果 overflow 不是定位元素，同时绝对定位元素和 overflow 容器之间没有定位元素，则 overflow 无法对 absolute 元素进行剪裁

```pug
.box5 
  img(
    src="	https://s.cn.bing.net/th?id=OHR.DragonBoat2022_ZH-…2392684688_1920x1080.jpg&rf=LaDigue_1920x1080.jpg",
    alt="",
    height=100
  )
```
```scss 
.box5 {
  border: 1px solid;
  height: 20px;
  overflow: hidden;
  
  // 如果 img 不是绝对定位元素，box5 设置 `overflow: hidden` 时 会对img 剪裁
  // img 设置绝对定位后，不会被剪裁，可以完整显示
  img {
    position: absolute;
  }
}
```

- 如果 overflow 属性所在的元素同时也是定位元素，里面的绝对元素会被剪裁

```pug
.box6
  img(
    src="	https://s.cn.bing.net/th?id=OHR.DragonBoat2022_ZH-…2392684688_1920x1080.jpg&rf=LaDigue_1920x1080.jpg",
    alt="",
    height=100
  )
```

```scss
.box6 {
  border: 1px solid;
  height: 20px;
  overflow: hidden;
  position: relative;
  
  img {
    position: absolute;
  }
  
}
```

- 如果 overflow 的属性值不是 hidden 而是 auto 或 scroll ，即使绝对定位元素高度比 overflow 元素高度还要大，也都不会出现滚动条。
如果 box7 容器有文字，高度超过容器，则会出现滚动条，但绝对定位元素不受滚动影响（不滚动）。

```pug 
.box7
  img(
    src="	https://s.cn.bing.net/th?id=OHR.DragonBoat2022_ZH-…2392684688_1920x1080.jpg&rf=LaDigue_1920x1080.jpg",
    alt="",
    height=100
  )
```
```scss
.box7 {
  border: 1px solid;
  background-color: #f2f2f2;
  height: 100px;
  overflow: auto;
  
  img {
    height: 200px;
    position: absolute;
  }
}
```