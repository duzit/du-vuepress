# transition 

## 语法

```css
transition: transition-property transition-duration transition-timing-function transition-delay;
```

## transition-property

- 指定哪个或哪些 CSS 属性用于过渡。只有指定的属性才会在过渡中发生动画，其它属性仍如通常那样瞬间变化。

## transition-duration

- 指定过渡的时长。或者为所有属性指定一个值，或者指定多个值，为每个属性指定不同的时长。

```css
transition-duration: 0.5s
transition-duration: 1s
```

## transition-timing-function

- 用来描述这个中间值是怎样计算的。实质上，通过这个函数会建立一条加速度曲线，因此在整个transition变化过程中，变化速度可以不断改变

```css
/* Keyword values */
animation-timing-function: ease;  // 动画以低速开始，然后加快，在结束前变慢
animation-timing-function: ease-in;  // 动画以低速开始
animation-timing-function: ease-out; // 动画以低速结束
animation-timing-function: ease-in-out; // 动画以低速开始和结束
animation-timing-function: linear; // 匀速，动画从头到尾的速度是相同的

transition-timing-function: cubic-bezier(0.1, 0.7, 1.0, 0.1)
transition-timing-function: step-start
transition-timing-function: step-end
transition-timing-function: steps(4, end)

transition-timing-function: ease, step-start, cubic-bezier(0.1, 0.7, 1.0, 0.1)

transition-timing-function: inherit
```

## transition-delay

- 指定延迟，即属性开始变化时与过渡开始发生时之间的时长。