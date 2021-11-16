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
    <div v-if="false">
      {{ title }}
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'waiting',
  setup(){
    const title = ref('');
    const setTitle = (value) => {
      title.value = value;
    }
    return {
      setTitle,
      title
    }
  }
})
</script>
<style scoped lang="scss">
@import "./waiting.scss";
</style>