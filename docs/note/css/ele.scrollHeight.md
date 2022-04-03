# element.scrollHeight

- 只读属性

- 元素内容高度的度量 包括由于溢出导致视图中不可见的内容

- 在不使用滚动条的情况下， `scrollHeight` 的值 等于为了适应视口所有内容所需的最小高度（clientHeight）

- 包括元素的 padding 和 ::before ::after 伪元素，不包括 border 和 margin

```html
<style>
  div + div {
    margin-top: 20px;
  }

  #box1 {
    width: 200px;
    height: 100px;
    /* border: 1px solid; */
    background-color: beige;
  }

  #box2 {
    width: 200px;
    height: 100px;
    /* border: 1px solid; */
    background-color: aquamarine;
    overflow: auto;
  }

  #box3 {
    width: 200px;
    height: 100px;
    /* border: 1px solid; */
    background-color: aquamarine;
    padding: 20px;
  }
</style>


<body>
  <div id="box1">
    hello world
  </div>
  <div id="box2">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla a nobis ipsam voluptates, reprehenderit magni. Quis sit porro ex totam at, aliquam eaque, nisi officia perferendis voluptates id. Ipsam, nemo?
  </div>

  <div id="box3">
    Padding
  </div>

</body>

<script>
  // 不滚动的情况
  const el1 = document.getElementById('box1')
  console.log(el1.scrollHeight); // 100
  console.log(el1.clientHeight); // 100

  // 滚动的情况
  const el2 = document.getElementById('box2')
  console.log(el2.scrollHeight); // 202
  console.log(el2.clientHeight); // 100

  // 有 padding 的元素
  const el3 = document.getElementById('box3')
  console.log(el3.scrollHeight); // 140
  console.log(el3.clientHeight); // 140
</script>
```

## 对比 clientHeight

- 只读属性

- 元素内部的高度，包含 padding 不包含 border margin 和 滚动条

- 可以 通过 CSS height + CSS padding - 滚动条高度 计算

::: tip 提示
此属性会将获取的值四舍五入取整数。 如果你需要小数结果, 请使用 element.getBoundingClientRect().
:::

## scrollTop

- [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollTop)

- 可以获取或设置元素内容的垂直滚动的像素数

- 一个元素的 `scrollTop` 值是这个元素的内容顶部（卷起来的）到它的视口可见内容（的顶部）的距离的度量

- 当一个元素的内容没有产生垂直方向的滚动条，那么它的 `scrollTop` 值为 0

```js
// 获取滚动的像素数
const st = ele.scrollTop

// 设置滚动的距离
ele.scrollTop = value;
```

## 判断元素是否滚动到底

- `scrollTop` 是一个非整数，而 `scrollHeight` 和 `clientHeight` 是四舍五入的，因此确定滚动区域是否滚动到底的唯一方法是查看滚动量是否足够接近某个阈值(在本例中为1)

```js
Math.abs(element.scrollHeight - element.clientHeight - element.scrollTop) < 1
```

## 判断元素是否能滚动

- 当容器不滚动但有溢出的子容器时，这些检查可以确定容器能否滚动

```js
window.getComputedStyle(element).overflowY === 'visible'
window.getComputedStyle(element).overflowY !== 'hidden'
```
