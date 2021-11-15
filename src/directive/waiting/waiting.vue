<template>
  <div class="waiting">
    <ul class="cubeParent">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
    <div>
      加载中
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'waiting',
  setup(){
    const setTitle = (value) => {
      console.log(value)
    }
    return {
      setTitle
    }
  }
})
</script>
<style scoped lang="scss">
@import "./waiting.scss";
</style>