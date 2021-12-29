# watchEffect 

```vue
<template>
  <div>
    <h1>watchEffect</h1>
    <el-button @click="count++">+1</el-button>
    <el-button @click="handleClickStop">stop watchEffect</el-button>
    <el-button @click="num++">num +1</el-button>
  </div>
</template>

<script>
import { watchEffect, ref, onUpdated, onBeforeUpdate } from 'vue'
import { ElMessage } from 'element-plus'
export default {
  name: 'watchEffect',
  setup () {
    // 为了根据响应式状态 自动应用和重新应用 副作用
    // 立即执行传入的函数 同时响应式追踪其依赖 并在其依赖发生变化时再次执行该函数
    const count = ref(0)

    watchEffect(() => {
      ElMessage.success(`watchEffect: ${count.value}`)
    })

    // 停止侦听
    const age = ref(12)
    const stop = watchEffect(() => {
      ElMessage.success(`stop watchEffect: ${age.value}`)
    })

    const handleClickStop = () => {
      ElMessage.warning('clicked')
      setTimeout(() => {
        age.value = 14
      }, 100);
      // watchEffect 不生效
      stop()
    }

    // 清除副作用
    // 有时副作用函数会执行一些异步操作，如果这些异步操作还未返回，但副作用已经失效，则要清除这些异步响应
    // 副作用函数接收 onInvalidate 函数作为参数 用来注册清理失效时的回调
    // 该回调会被触发的条件
    // 1. 副作用即将重新执行
    // 2. 侦听器被停止（如果在 setup 或组件生命周期钩子函数中使用了 watchEffect ，则在组件卸载时）
    // watchEffect(onInvalidate => {
    //   const token = asyncOpt()

    //   onInvalidate(() => {
    //     token.cancel()
    //   })
    // })

    // 副作用刷新时机
    // 默认情况 副作用回调会在组件的 update 之前被调用
    // 如果想修改 副作用的刷新时机 可以配置 { flush: 'xxx' } 
    // flush 选项可以有 pre(默认) post sync
    const num = ref(0)

    watchEffect(() => {
      console.log('count change in watchEffect');
      ElMessage.success(`count change in watchEffect: ${num.value}`)
    })

    watchEffect(
      () => {},
      {
        flush: 'post'
      }
    )

    onBeforeUpdate(() => {
      
      console.log('count change in onBeforeUpdate');
    })

    onUpdated(() => {
      console.log('count change in onUpdated');
      ElMessage.success(`count change in onUpdated: ${num.value}`)
    })

    return {
      count,
      age,
      handleClickStop,
      num
    }
  }
}
</script>
```