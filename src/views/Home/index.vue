<template>
  <div class="home">
      <headBar @lftClick="headBarLeftClick" @rgtClick="headBarRightClick"></headBar>
      <van-popup v-model:show="state.showLeft" position="left" class="leftPopup" :style="{ width: '80vw', height: '100vh' }">
        <sidebarMenu></sidebarMenu>
      </van-popup>
      <van-popup v-model:show="state.showRight" position="right" class="rightPopup" :style="{ width: '50vw', height: '100vh' }">
        <div style="width: 100%; height: 100%">right content</div>
      </van-popup>
  </div>
</template>
<script>
import Home from './index.js';
export default Home;
</script>
<style scoped lang="scss">
  @import "index.scss";
</style>