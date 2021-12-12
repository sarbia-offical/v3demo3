<template>
  <div class="imgPopup">
    <van-popup v-model:show="show1" position="center" class="popup" 
      :style="{ 
        width: '80vw', 
        height: '50vh', 
        borderRadius: '2%', 
        overflow: 'hidden' }">
      <div class="pic"></div>
    </van-popup>
  </div>
</template>
<script>
import { defineComponent, watch, computed, ref } from 'vue';
export default defineComponent({
  name: 'imgPopup',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  setup(props, context) {
    const show1 = computed(() => props.show);
    console.log(show1);
    return {
      show1
    };
  }
})
</script>
<style scoped lang="scss">
  .imgPopup{
    position: fixed;
    z-index: 99999;
    .pic{
      width: 100%;
      height: 100%;
      padding: .5rem;
      box-sizing: border-box;
    }
  }
</style>