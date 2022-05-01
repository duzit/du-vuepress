# animation 动画

- [animation-MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Animations/Using_CSS_animations)

::: tip
是 animation-name，animation-duration, animation-timing-function，animation-delay，animation-iteration-count，animation-direction，animation-fill-mode 和 animation-play-state 属性的一个简写属性形式。
:::

- 包含两部分，描述动画的样式规则，和 用于指定动画开始、结束一级中间节点样式的关键帧

## animation 子属性

- animation-duration 设置动画一个周期的时长

- animation-delay 设置延时，从元素加载完成之后到动画序列开始执行的这段时间

- animation-direction 设置动画在每次执行完成后，是反向运行还是重新回到开始位置重新运行

| 属性 | 描述 | 
| --- | --- |
| normal | 默认值 每个动画循环结束，动画重置到起点重新开始 |   
| alternate | 动画交替反向运行，反向运行时，动画按步后退，同时，带时间功能的函数也反向，比如，ease-in 在反向时成为 ease-out | 
| reverse | 反向运行动画，每周期结束，动画从尾至头运行 | 
| alternate-reverse | 反向交替 反向开始交替执行动画 | 

- animation-iteration-count 设置动画重复次数 

| 属性 | 描述 | 
| --- | --- |
| infinite | 无限循环 |
| number | 设置具体的循环次数 | 

- animation-name 由 @keyframes 指定的关键帧名称

- animation-timing-function 设置动画速度，通过建立加速度曲线，设置动画在关键帧之间如何变化

| 属性 | 描述 | 
| --- | --- |
| ease | 低速开始 然后加快 结束前变慢 |
| ease-in | 低速开始 |
| ease-out | 低速结束 |
| ease-in-out | 低速结束和结束 |
| linear | 匀速 |

- animation-fill-mode 设置动画执行前和执行后如何将样式应用于目标

| 属性 | 描述 | 
| --- | --- |
| none | 默认值，不会将任何样式应用于目标 |
| forwards | 应用动画执行期间最后一个关键帧的计算值，取决于 animation-direction 和 animation-iteration-count | 
| backwards | 应用动画执行时第一个关键帧的计算值，并在 animation-delay 期间保留此值，取决于 animation-direction |

## 例子

- [codepen animation](https://codepen.io/duzit/pen/xxYxXVK?editors=1100)