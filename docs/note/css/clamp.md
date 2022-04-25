# clamp()

- 函数的作用是把一个值限制在一个上限和下限之间，当这个值超过最小和最大值时，在两者之间选择一个值使用。

- `clamp(min, val, max)`

``` html
<div class='clamp-box1'>Hello You. How are you?</div>

.clamp-box1 {
  font-size clamp(12px, 2.5vw, 50px)
}
```

<div class='clamp-box1'>Hello You. How are you?</div>