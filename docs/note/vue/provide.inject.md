# Provide inject

- 深度嵌套的组件，子组件需要部分父组件的数据

- 长距离的 prop 

![provide](./assets/components_provide.png)

## 传递常量和实例下的property

```js
// 父组件
app.component('btn-list', {
  data: () => {
    return {
      name: 'hello'
    }
  },
  // 传递常量
  provide: {
    user: 'Ben', 
  },
  // 如果想要传递实例下的 property 需要将 provide 改为返回对象的函数
  provide() {
    return {
      name: this.name
    }
  }
})

// 子组件
app.component('children-list', {
  data: () => {

  },
  inject: ['user']
})
```

## 响应式处理

- 默认情况下 provide inject 不是响应式的

```vue
// provide.inject.vue
<template>
  <div>
    <h1>Provide inject</h1>
    <el-button @click="handleChangeName">change name</el-button>
    <el-button @click="handleChangeCount">change count</el-button>
    <p>父组件 name: {{ name }}</p>
    <p>父组件 count: {{ count }}</p>

    <Provide />
  </div>
</template>

<script>
import Provide from '@/components/provide.vue'
import { ref, provide, readonly } from 'vue'
import { ElMessage } from 'element-plus'

export default {
  components: {
    Provide
  },
  setup () {
    // 非响应式 父组件改变后 子组件不感知
    let name = 'Hello' 
    provide('name', name)

    // 响应式 子组件感知父组件值的变化
    const count = ref(0)
    provide('count', count)

    const handleChangeName = () => {
      name = 'Moto'
      ElMessage.success(`name: ${name}`)
    }

    const handleChangeCount = () => {
      count.value++
    }

    // 如果子组件内部改变 父组件 provide 数据 则将方法 handleChangeCount 写入 provide
    provide('handleChangeCount', handleChangeCount)

    // 如果不想子组件修改父组件provide数据 则使用 readonly
    const readonlyCount = ref(1)
    provide('readonlyCount', readonly(readonlyCount))

    return {
      count,
      name,
      handleChangeName,
      handleChangeCount
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
```

```vue
// provide.vue
<template>
  <div>
    <p>子组件name: {{ name }}</p>
    <p>子组件count: {{ count }}</p>
    <el-button @click="handleChangeCount">改变父组件provide</el-button>
  </div>
</template>

<script>
import { inject } from 'vue'

export default {
  setup () {
    const name = inject('name')
    const count = inject('count')

    const handleChangeCount = inject('handleChangeCount')

    return {
      name,
      count,
      handleChangeCount
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
```