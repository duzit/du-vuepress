# 常用功能总结 

## echarts常用属性设置

### 线性图颜色渐变
```
线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
series: [{
name: '工单',
type: 'line',
areaStyle: {
  color: {
    type: 'linear',
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [{
        offset: 0, color: '#477FE3' // 0% 处的颜色
    }, {
        offset: 1, color: '#fff' // 100% 处的颜色
    }],
    global: false // 缺省为 false
  }
},
}]
```

### 柱状图颜色渐变
```
let echarts = require('echarts/lib/echarts') 需要在对应文件中引用echarts
series: [{
  barWidth: 20,
  itemStyle: {
    normal: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
          offset: 0,
          color: "#BD5FFF"
        }, 
        {
          offset: 1,
          color: "#477FE3",
        }
      ], false)
    }
  }
}]
```

### x轴标签显示
* 倾斜
* 格式化
```
xAxis: {
  axisLabel: {
    // interval: 0,
    rotate: 40,
    margin: 2,
    formatter: function(value, index) {
      if (value) {
        return value.length > 6 ? value.substring(0, 6) + '...' : value
      }
    },
  }
},
```

### 饼图 柱状图 小图标形状设置
* 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
* 通过 'image://url' 设置为图片
  > 'image://http://xxx.xxx.xxx/a/b.png'
  > 'image://data:image/gif;base64,R0lGODlhEAA...'
```
legend: {
  data: [
    {
      name: 'Name',
      icon: 'circle'
    },
    {
      name: 'Code',
      icon: 'rect'
    }
  ]
}
```

### 两个y轴显示
* y轴定义两个对象, series中两个对象用于区分y轴，绑定不同数据的属性是 yAxisIndex
* yAxisIndex: 0 和 yAxisIndex: 1

```
let yAxisData = [
  {
    name: '件',
    nameTextStyle: {
      color: '#fff'
    },
    type: 'value',
    axisLabel: {
      color: '#fff',
    },
    axisLine: {
      lineStyle: {
        color: '#2b6584' // y轴颜色
      }
    },
    splitLine: {
      interval: 2,
      lineStyle: {
        color: '#2b6584',
        type: 'dashed'
      }
    }
  },
  {
    name: '小时',
    nameTextStyle: {
      color: '#fff'
    },
    type: 'value',
    axisLabel: {
      color: '#fff'
    },
    axisLine: {
      lineStyle: {
        color: '#2b6584' // y轴颜色
      }
    },
    splitLine: { // 分割线颜色
      interval: 2,
      lineStyle: {
        color: '#2b6584',
        type: 'dashed'
      }
    },
  }
]
```

### 调整图形位置
* grid
```js
grid: [{
  left: '10%',
  bottom: '10%',
  top: '10%',
  right: '10%'
}],
```

### 柱状图设置柱圆角
* barBorderRadius

```
itemStyle: {
  normal: {
    barBorderRadius: [5, 5, 0, 0]
  }
}
```

### 柱状图设置颜色渐变
```
itemStyle: {
  normal: {
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
      offset: 0,
      color: '#ba7ef3'
      }, {
        offset: 1,
        color: '#965df2'
      }
    ]),
	}
},
```

### 是否显示刻度线
```
axisTick: {
  show: false
},
```

### x轴 
* 换行显示 axisLabel.formatter
* x轴坐标全显示 axisLabel.interval 设为0
* x轴线颜色 axisLine.lineStyle
* x轴线透明度 opacity

```
xAxis: [
  {
    type: 'category',
    data: ['已安装    水、汽监测企业', '已安装    水监测企业', '已安装    气监测企业', '未安装    监测设备企业'], // 一行显示7个字，增加4个空格
    axisPointer: {
      type: 'shadow'
    },
    axisLabel: {
      formatter:function(params) { // 换行显示
        var newParamsName = "";
        var paramsNameNumber = params.length;
        var provideNumber = 7;  // 一行显示几个字
        var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
        if (paramsNameNumber > provideNumber) {
          for (var p = 0; p < rowNumber; p++) {
            var tempStr = "";
            var start = p * provideNumber;
            var end = start + provideNumber;
            if (p == rowNumber - 1) {
              tempStr = params.substring(start, paramsNameNumber);
            } else {
              tempStr = params.substring(start, end) + "\n";
            }
            newParamsName += tempStr;
          }
        } else {
          newParamsName = params;
        }
        return newParamsName
      },
      color: '#2DC2FD',
      interval: 0, // x轴坐标全部显示
    },
    axisLine: {
      lineStyle: {
        color: '#009CFF'
      },
    },
    splitLine: {
      // interval: 2,
      show: true,
      lineStyle: {
        color: 'rgba(0,159,255,0.65)',
        type: 'solid',
        opacity: 0.65,
      }
    },
    minorTick: {
      show: true
    },
    minorSplitLine: {
      show: true,
      lineStyle: {
        color: 'rgba(0,159,255,0.65)',
        opacity: 0.65,
      }
    }
  }
],
```

### y轴
* 次分割线 minorSplitLine

```
yAxis: [
  {
    name: '',
    type: 'value',
    nameTextStyle: {
      color: '#fff'
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#009CFF' // y轴颜色
      }
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: '#2DC2FD'
    },
    splitLine: {
      interval: 2,
      lineStyle: {
        color: 'rgba(0,159,255,0.65)',
        type: 'solid',
        opacity: 0.65,
      }
    },
    // minorTick: {
    //   show: true
    // },
    minorSplitLine: {
      show: true,
      lineStyle: {
        color: 'rgba(0,159,255,0.65)',
        opacity: 0.65,
      }
    }
  }
],
```

### 柱状图 每个柱颜色设置 及 数据显示在柱状图顶部

```
series: [
  {
    name: '',
    type: 'pictorialBar',
    symbol: 'rect',
    symbolSize: [20, 10],
    symbolRepeat: true,
    areaStyle: {},
    data: [this.pandectData.waterAndGasMonitoringNum, 
      this.pandectData.waterMonitoringNum, 
      this.pandectData.gasMonitoringNum, 
      this.pandectData.nonMonitoringNum],
    itemStyle: {
      normal: {
        color: function(params) {
        　// 定义一个颜色数组
          var colorList = ['#2788FF','#2DC2FD','#2DFDD3','#D4D7D8']
          return colorList[params.dataIndex]
        },
        label: { // 数据显示在柱状图顶部
          show: true,
          position: 'top',
          textStyle: {
            color: '#CFEFFF',
            fontSize: 16
          } 
        }
      }
    }
  }
]
```

### 饼图颜色设置 及 label样式
* series.label.normal  
  {a} 系列名  
  {b} 数据名  
  {c} 数据值  
  {d} 百分比  
  {@xxx} 数据中名为'xxx'纬度的值，如{@product}表示名为'product'的纬度的值  
  {@[n]} 数据中维度n的值，如{@[3]}` 表示维度 3 的值，从 0 开始计数
* label.position 标签的位置
  outside inside center

```
originalOptions: {
  color: ['#37EAA4', '#E03B42', '#FEED5E'],
  series: [{
    type:'pie',
    label: {
      normal: {
        show: true,
        formatter: '{b}({c})', // label 显示格式 xxx(5)
        formatter: '{b}({d}%)', // label 显示格式 xxx(50%)
      },
    },
  }]
}
```

### 多条折线图 y轴刻度不准确
* https://github.com/apache/echarts/issues/3808