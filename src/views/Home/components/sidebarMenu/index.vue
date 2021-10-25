<template>
  <div class="sidebarMenu">
    <div class="sidebarMenu_top">
      <div class="sidebarMenu_avator">
        <img src="@/assets/img/img.png">
      </div>
    </div>
    <p class="lorem">[ 千山鸟飞绝，万径人踪灭 ]</p>
    <div class="sidebarMenu_body">
      <div :class="{menu: true, active: false}" v-for="(item, index) in state.menus" :key="index">
        <iconComponent :iconPath="item.icon" @click="item.onClick" :iconColor="'#8b0000'"></iconComponent>
        {{ item.label }}
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive } from 'vue';
export default defineComponent({
  name: 'sidebarMenu',
  setup(){
    const state = reactive({
      'menus': [
        {
          label: '进入主页',
          path: '/Home',
          icon: 'icon-home',
          onClick: () => {

          }
        },

        {
          label: '歌手分类',
          path: '/Singers',
          icon: 'icon-fenlei',
          onClick: () => {

          }
        },
        {
          label: '精品歌单',
          path: '/HighqualityPlayList',
          icon: 'icon-gedan',
          onClick: () => {

          }
        },
        {
          label: '每日歌单',
          path: '/RecommendSong',
          icon: 'icon-xihuan',
          onClick: () => {

          }
        }
      ]
    })
    return {
      state
    }
  }
})
</script>
<style scoped lang="scss">
@import "index";
</style>