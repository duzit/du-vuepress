# background

- [源码参考](https://github.com/duzit/du-css/blob/master/src/propertys/background.html)

- background-color 
- background-clip 
- background-image 
- background-origin 
- background-position 
- background-repeat 
- background-size 
- background-attchment 

## background-clip 

- 设置元素的背景（图片或颜色）是否延伸到边框（border-box），内边距（padding-box），
内容（content-box）

## background-image

- 为元素设置一个或多个背景图片

- 图像以z方向堆叠方式进行，先指定的图像会在之后指定的图像上方绘制

- 元素的边框会在图像之上被绘制 

## background-size

- `<length>` 指定背景图片大小，不能为负值

- `<percentage>` 指定背景图片相对背景区（bg position area）的百分比，背景区由background-origin设置

- `auto` 以背景图片的比例缩放

- `cover` 完全覆盖背景区，可能部分背景图片看不见

- `contain` 缩放背景图片以完全装入背景区，可能背景区部分空白

## background-origin

- 规定指定图片 bg-image 属性的原点位置的背景相对区域

- 初始值 padding-box

- border-box 

- content-box

## background-position 

- 一个值的语法：   
`center top right bottom left`  
`length percent` 指定相对于左边界的 x 坐标，y 坐标被设置成 50%

- 两个值的语法： x,y 坐标，默认值是 left top 或 0% 0% 

- 三个值的语法：前两个是关键字值，第三个是前面值的偏移量

- 四个值的语法： 第一个和第三个是定义 x y 关键字值，第二和第四个是偏移量

## background-attchment

- 决定背景图像的位置在视口内固定，或者随着包含它的区块滚动

- fixed 相对视口固定

- local 相对于元素的内容固定

- scroll 背景相对于元素本身固定，不是随着内容滚动