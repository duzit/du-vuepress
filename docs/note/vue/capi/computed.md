# Computed 

```vue
<template>
  <div>
    <p>count: {{count}}</p>
    <p>computedCount: {{computedCount}}</p>
    <el-button @click="count++">+1</el-button>
    <el-button @click="handleSetComputed">Set Computed</el-button>
  </div>
</template>

<script setup>
  import { computed, ref } from 'vue'
  import { ElMessage } from 'element-plus'

  const count = ref(0)
  let computedCount = computed({
    get() {
      return `count is ${count.value}`
    },
    set(val) {
      ElMessage.success('compouted set.')
      count.value = val - 1
    }
  })

  const handleSetComputed = () => {
    computedCount.value = 10
  }

</script>

<style lang="scss" scoped>

</style>
```