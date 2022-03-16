# img 使用动态 src 遇到的问题

## 示例 使用require

```js
// 无效示例 imgSrc 是全路径
const imgSrc = '@/assets/img/logo.png';
<img :src="getImgSrc()" />
function getImgSrc() {
  return require(imgSrc);
}

// 有效示例 
const img = 'logo.png';
<img :src="getImgSrc()" />

function getImgSrc() {
  return require('@/assets/img/' + img);
}
```

## 实际需求 点击不同节点展示不同图片 

```js 
const arr1 = [
  {
    label: '节点1',
    value: '1',
    img: '@/assets/img/111.png'
  },
  {
    label: '节点2',
    value: '2',
    img: '@/assets/img/222.png'
  }
];

const arr2 = [
  {
    label: '节点1',
    value: '1',
    img: '111.png'
  },
  {
    label: '节点2',
    value: '2',
    img: '222.png'
  }
];
```

* arr1 中 img是全资源路径 如果直接返回当做src 则不起作用 并不能加载到相应的资源
* arr2 中 img是资源名称 采用 `return require('@/assets/img/' + img) ` 这种方式加载ok

## 另外一种无效的方式

```js
getImgHalf() {
const url1 = '/assets/th1129.jpeg';
const url2 = 'th1129.jpeg';
// return require('@' + url1); // 这种方式无效
return require('@/assets/' + url2);
}
```