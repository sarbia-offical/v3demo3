<template>
  <div class="iconComponent">
    <div :class="'iconfont '+iconPath" :style="{ color: iconColor, fontSize: fontSize }"></div>
  </div>
</template>
<script>
import {defineComponent, toRefs} from 'vue';
export default defineComponent({
  name: 'icon',
  props: {
    iconPath: {
      type: String,
      default: ''
    },
    iconColor: {
      type: String,
      default: '#ffffff'
    },
    fontSize: {
      type: String,
      default: '20px'
    }
  },
  setup(props,{ attrs, slots, emit }){
    const { iconPath } = toRefs(props);
    return {
      iconPath
    };
  },

})
</script>
<style scoped lang="scss">
  .iconComponent{
  }
</style>