/*
 * @Author: lizhixiang 1245634367@qq.com
 * @Date: 2023-09-01 09:45:30
 * @LastEditors: lizhixiang 1245634367@qq.com
 * @LastEditTime: 2023-09-01 09:45:42
 * @FilePath: \largeScreen\src\home\index.vue
 * @Description: Fuck Bug
 * 微信：My-World-40
 */
<template>
  <div class="container">
  </div>
</template>
 
<script>
import { toRefs, reactive, onMounted, watchEffect, onUnmounted } from 'vue'
export default {
  name: '',
  props: {},
  components: {},
  setup(props, { emit }) {
    // 传参
    const state = reactive({
    })
    // 方法
    const incident = () => {
      console.log('执行方法')
    }
    // 挂载
    onMounted(() => {
      console.log('挂载')
    })
    // 监听
    watchEffect(() => {
      console.log('监听')
    })
    // 页面卸载
    onUnmounted(() => {
      console.log('页面卸载')
    })
    return {
      ...toRefs(state),
      incident
    }
  }
}
</script>
 
<style scoped lang="scss">
.container {}
</style>
 