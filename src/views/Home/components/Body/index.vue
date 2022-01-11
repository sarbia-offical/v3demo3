<!--
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2021-11-15 10:37:05
 * @LastEditors: zouwenqin
 * @LastEditTime: 2022-01-11 17:04:37
-->
<template>
  <div class="container" v-loading:[loadingText]="{flag: loading}">
    <div class="headBar">
      <div class="top">
        <iconComponent :iconPath="'icon-sucai'" :iconColor="'#ffffff'" @click="headBarLeftClick"></iconComponent>
        <div class="title">Kalinka</div>
        <iconComponent :iconPath="'icon-shenglvehao'" :iconColor="'#ffffff'" @click="headBarRightClick"></iconComponent>
      </div>
    </div>
    <div class="cloud"></div>
  </div>
</template>
<script>
import Body from './index';
export default Body;
</script>
<style scoped lang="scss">
  @import "index";
</style>