<template>
  <div @scroll="scrollFunc" class="container" ref="containerRef">
    <div :class="{headBar: true, headBarTransition: scrollFlag}">
      <div class="top" ref="topRef">
        <iconComponent :iconPath="'icon-sucai'" @click="headBarLeftClick"></iconComponent>
        <div class="title">Home</div>
        <iconComponent :iconPath="'icon-qianbao'" @click="headBarRightClick"></iconComponent>
      </div>
      <div :class="{musicCard: true, musicCardTransition: scrollFlag}">
        <div class="musicCardHead">
          <span class="musicCardTitle">Now Playing</span>
          <iconComponent :iconPath="'icon-xianhua'" :iconColor="'#ff0000'"></iconComponent>
        </div>
        <div class="musicCardBody">
          <div class="musicBanner"></div>
          <div class="musicInfo">
            <div class="songName">Hard Rock</div>
            <div class="singer">87.6FM</div>
          </div>
        </div>
      </div>
      <div :class="{searchControl: true, searchControlTransition: scrollFlag}">
        <span>瘦</span>
      </div>
    </div>
    <div class="bodyContent">
      <div class="mouse-wheel-wrapper" ref="scrollRef">
        <div class="mouse-wheel-content">
          <div class="mouse-wheel-item" v-for="n in 100" :key="n">{{n}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue';
export default defineComponent({
  name: 'headBar',
  setup(props, { attrs, slots, emit }){
    const scrollRef = ref(null);
    const containerRef = ref(null);
    const topRef = ref(null);
    const scrollFlag = ref(false);
    const headBarLeftClick = () => {
      emit('lftClick')
    };
    const headBarRightClick = () => {
      emit('rgtClick');
    };
    // 监听滚动条事件
    const scrollFunc = (event) => {
      if(containerRef.value?.scrollTop > ( Math.ceil(topRef.value?.clientHeight )+ 5)){
        if(!scrollFlag.value){
            scrollFlag.value = true;
        }
      } else {
        scrollFlag.value = false;
      }
    };
    onMounted(() => {

    })
    return {
      topRef,
      scrollRef,
      containerRef,
      scrollFlag,
      headBarLeftClick,
      headBarRightClick,
      scrollFunc
    }
  }
})
</script>
<style scoped lang="scss">
  @import "index";
</style>