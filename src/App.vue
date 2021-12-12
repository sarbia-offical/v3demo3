<!--
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2021-09-14 15:36:41
 * @LastEditors: zouwenqin
 * @LastEditTime: 2021-10-12 00:27:25
-->
<template>
  <div>
    <router-view/>
    <Player></Player>
  </div>
</template>

<script>
import Player from '../src/components/player/index.vue'
export default {
  name: 'App',
  components: {
    Player
  }
}
</script>


<style>
*{
  margin: 0;
  padding: 0;
}
@font-face {
  font-family: 'hyxhkj';
  src: url("./assets/汉仪细行楷简.ttf");
}
.dialogStyle{
  z-index: 999999 !important;
}
</style>
