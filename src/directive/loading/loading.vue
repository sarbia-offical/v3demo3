<template>
  <div class="loadingBox">
    <div>
      <div class="loading">
        <span style="--i:1"></span>
        <span style="--i:2"></span>
        <span style="--i:3"></span>
        <span style="--i:4"></span>
        <span style="--i:5"></span>
        <span style="--i:6"></span>
        <span style="--i:7"></span>
      </div>
      <svg>
        <filter id="gooey">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
          <feColorMatrix values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 20 -10
                " />
        </filter>
      </svg>
    </div>
    <div class="loadingText">
      {{ loadingText }}
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'loading',
  setup(){
    const loadingText = ref('loading...');
    const setTitle = (title) =>{
      loadingText.value = title;
    }
    return {
      setTitle,
      loadingText
    }
  }
})
</script>
<style scoped lang="scss">
@import "./loading.scss";
</style>