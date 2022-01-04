<!--
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2022-01-04 08:59:27
 * @LastEditors: zouwenqin
 * @LastEditTime: 2022-01-04 11:48:44
-->
<template>
  <div class="progress-bar" ref="progressBar">
    <div class="bar-inner">
      <div class="progress" ref="progress" :style="widthStyle"></div>
      <div class="progress-btn-wrapper">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, watch, computed, ref } from "vue";
export default defineComponent({
  name: "progressBar",
  props: {
    progress: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const transformX = ref(0);
    console.log('进入');
    console.log(props);
    const progressBar = ref(null);
    const progress = ref(null);
    watch(() => props.progress, (newVal, oldVal) => {
      if(!!newVal){
        transformX.value = (progressBar.value.clientWidth) * newVal
      }
    })
    const widthStyle = computed(() => {
      console.log(transformX.value);
      return {
        width: `${transformX.value}px`
      }
    })
    return {
      progressBar,
      progress,
      widthStyle
    }
  }
});
</script>

<style scoped lang="scss">
.progress-bar {
  height: 30px;
  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);
    .progress {
      position: absolute;
      height: 100%;
      background: $color-theme;
    }
    .progress-btn-wrapper {
      position: absolute;
      left: -7px;
      top: -13px;
      width: 30px;
      height: 30px;
      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid $color-text;
        border-radius: 50%;
        background: $color-theme;
      }
    }
  }
}
</style>