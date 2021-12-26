# [refs](https://v3.cn.vuejs.org/api/refs-api.html) 


```vue
<template>
  <div>
    <h1>ref</h1>

    <el-button @click="handleClick">+1</el-button>
    <p>count: {{ count }}</p>
    <!-- <p>unrefVal: {{ unrefVal }}</p> -->
    <p>version: {{ version }}</p>
    <p>auther: {{ auther }}</p>
    <el-input class="w200" v-model="text" />
    <br>
    <el-button class="mt20" @click="handleShallowRefClick">ShallowRefClick</el-button>
    <p>sRef: {{ sRef }}</p>
    <p>sRefType: {{ sRefType }}</p>
    <p>sRefType.name: {{ sRefType.name }}</p>
    <el-button class="mt20" @click="handleShallowRefClickNest">ShallowRefClick Nest</el-button>
    <p>sRefNest: {{ sRefNest }}</p>
    <p>sRefNest.person: {{ sRefNest.person }}</p>
    <p>sRefNest.age: {{ sRefNest.age }}</p>

  </div>
</template>

<script>
// ref
import {
  reactive,
  ref, toRef, unref, toRefs, isRef, customRef, shallowRef, isReactive, triggerRef
} from 'vue'
import getReactiveByToRefs from './torefs'

export default {
  name: 'ref',
  setup () {
    // ref 
    // 接受一个内部值 并返回一个响应式且可变的ref对象，ref对象仅有一个 .value 的属性，指向其内部值
    const count = ref(0)

    const handleClick = () => {
      count.value++
      // unrefVal = '123'
    }

    // unref
    // 如果参数是一个ref 则返回其内部值 否则返回其本身 
    // 非响应式
    // val = isRef(val) ? val.value : val
    let unrefVal = unref(count)
    console.log(unrefVal);

    // toRef start
    // 可以为源响应式对象上的某个属性新创建一个 ref ，且ref可以被传递，保持对源对象上属性的响应式连接
    const person = reactive({
      name: 'zhangsan',
      age: 12,
      job: 'sy'
    })
    // toRef end

    const age = toRef(person, 'age')
    age.value = 14
    console.log(person.age); // 14 改变源对象属性值
    person.age = 16
    console.log(age.value); // 16

    // toRefs start
    // 将响应式对象转换成普通对象，其中结果对象的每个属性都指向源对象的响应属性的ref
    const toRefsObj = {
      name: 'torefs',
      count: 1
    }

    const toRefsBackup = toRefs(toRefsObj)
    toRefsBackup.count.value++
    console.log(toRefsObj.count); // 2
    toRefsObj.count++
    console.log(toRefsBackup.count.value); // 3

    // 当从组合式函数返回对象时 toRefs很有用 
    const { version, auther } = getReactiveByToRefs()
    version.value = '1.1.2' // 响应式改变
    // toRefs end

    // isRef 
    // 检查值是否是一个ref
    console.log(isRef(count)); // true
    console.log(isRef('count')); // false

    // customRef start
    // 创建一个自定义 ref，并对其依赖项进行跟踪更新触发进行显式控制。
    // 它需要一个工厂函数，该函数接收 track 和 trigger 函数作为参数，并且应该返回一个带有 get 和 set 的对象
    const customRefFn = (value, delay = 200) => {
      let timer = null
      return customRef((track, trigger) => {
        return {
          get() {
            track()
            return value
          },
          set(newValue) {
            clearTimeout(timer)
            timer = setTimeout(() => {
              value = newValue
              trigger()
            }, delay);
          }
        }
      })
    }
    // customRef end

    // shallowRef 
    // 创建一个跟踪自身 .value 变化的ref 但不会使其值也变成响应式
    const sRef = shallowRef('hello')
    const sRefType = shallowRef({ name: 'hello', age: 12 })
    const sRefNest = shallowRef({
      person: {
        name: 'Ben'
      },
      age: 12
    })

    // 这里赋值也是响应式的 因为 sRef 初始化时 是基本数据类型
    sRef.value = 'Hello Moto'

    const handleShallowRefClick = () => {
      // 这里的改变是响应式的 value change时重新渲染的同时，也渲染了下面 sRefType 值的改变
      // 造成的假象 是 sRefType.value.name 也是响应式的了 
      // 实际上 sRefType.value.name 的改变会在 nextTick 渲染 
      // .value 是响应式的 
      sRef.value = 'Moto'

      // sRefType.value = {'name': 'Yo'}
      console.log(sRefType.value.name); // Yo
      sRefType.value.name = 'Yooo'
      sRefType.value.age = 16
      console.log(sRefType.value.name); // Yooo
    }
    const handleShallowRefClickNest = () => {
      // 如果这里 重新初始化 sRefNest 则是响应式的 不需要 nextTick 才会更新
      // sRefNest.value = {
      //   person: {
      //     name: 'xiao'
      //   },
      //   age: 10
      // }
      // 如果没有上面的初始化 以下的赋值 nextTick 才会更新 未使用 triggerRef 的情况下 
      sRefNest.value.person.name = 'Lee'

      sRefType.value.name = 'Yooo'
      sRefType.value.age = 16

      sRefNest.value.age = 14
      console.log(sRefNest.value.age); // 14
      // triggerRef 会及时更新视图
      // triggerRef(sRefNest)
    }

    console.log(isReactive(sRefType)); // false
 
    return {
      count,
      handleClick,
      version,
      auther,
      // unrefVal
      text: customRefFn('hello'),
      handleShallowRefClick,
      sRef,
      sRefType,
      sRefNest,
      handleShallowRefClickNest
    }
  }
}
</script>

<style scoped>
  
</style>
```