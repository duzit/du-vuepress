# Watch

```vue
<template>
  <div>
    <p>count: {{ count }}</p>
    <el-button @click="count++">+1</el-button>
    <br>
    <p>age: {{ activeObj.age }}</p>
    <el-button @click="activeObj.age++">+1</el-button>
    <br>
    <el-button class="mt20" @click="hadnleClickWatchs">change multi</el-button>
    <br>
    <el-button class="mt20" @click="hadnleClickArray">响应式数组</el-button>
    <el-button class="mt20" @click="hadnleClickObj">响应式对象</el-button>
  </div>
</template>

<script>
import { reactive, ref, watch, nextTick } from 'vue'
import {ElMessage} from 'element-plus'
import _ from 'lodash'

export default {
  name: 'Watch',
  setup () {
    // watch
    // 默认是惰性的 只有当被侦听的源发生变化时才会执行回调

    // 侦听单个数据源
    // 侦听ref
    const count = ref(0)
    watch(
      count,
      (val, old) => {
        ElMessage.warning(`watch count: new: ${val}, old: ${old}`)
      }
    )
    
    // 侦听 reactive
    const activeObj = reactive({
      age: 0,
      name: 'lee'
    })
    watch(
      () => activeObj.age,
      (val, old) => {
        ElMessage.success(`reactive watch. age: ${val}-${old}`)
      }
    )

    // 侦听多个数据源
    // ref
    let tpmName = ref('lee')
    let tpmAge = ref(12)
    watch(
      [tpmName, tpmAge],
      (newVals, oldVals) => {
        console.log(newVals, oldVals);
        ElMessage.success(`${newVals} - ${oldVals}`) // [bee,14] - [lee,12]
      },
      // { flush: 'sync' } // 可以为每个更改强制触发侦听器
    )

    // 在同一个函数里同时改变这两个被侦听的值 侦听器只会执行一次
    // 通过更改配置 { flush: sync } 可以为每个更改强制触发侦听器
    // 或者可以使用 nextTick 等待侦听器在下一步改变之前执行
    const hadnleClickWatchs = () => {
      tpmName.value = 'bee'
      tpmAge.value = 14
    }
    // 如下 侦听器会触发两次
    // const hadnleClickWatchs = async () => {
    //   tpmName.value = 'bee'
    //   await nextTick()
    //   tpmAge.value = 14
    // }

    // 侦听响应式对象
    // 数组
    const numbers = reactive([1,2,3,4])
    watch(
      () => [...numbers],
      (val, old) => {
        console.log(val, old); // [1, 2, 3, 4, 5]  [1, 2, 3, 4]
        ElMessage.success(`${val} - ${old}`)
      }
    )

    const hadnleClickArray = () => {
      numbers.push(5)
    }

    // 对象 非嵌套
    const personObj = reactive({
      name: 'hello'
    })
    watch(
      () => _.cloneDeep(personObj), // 深拷贝在这里体现
      // () => personObj, // 深拷贝在这里体现
      (val, old) => {
        console.log(val, old); // 
        // 这里可以看到 old.name 也是 Moto 
        // 返回当前值和上一个状态值的引用
        // 为了完全侦听对象或数据 需要对值深拷贝
        // ElMessage.success(`${val.name} - ${old.name}`) // Moto Moto 
        // 如果使用深拷贝 则这里的 old.name 为 hello
        ElMessage.success(`${val.name} - ${old.name}`) // Moto hello 
      },
      { deep: true } // 不设置 deep: true 的话 即使修改一层的 name 也不会触发侦听器
    )
    const hadnleClickObj = () => {
      personObj.name = 'Moto'
    }

    return {
      count,
      activeObj,
      hadnleClickWatchs,
      hadnleClickArray,
      hadnleClickObj
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
```

