<template>
  <div class="container" v-loading:[loadingText]="{flag: loading}">
    <div class="headBar">
      <div class="top">
        <iconComponent :iconPath="'icon-sucai'" :iconColor="'#36333f'" @click="headBarLeftClick"></iconComponent>
        <div class="title">寻找无双</div>
        <iconComponent :iconPath="'icon-shenglvehao'" :iconColor="'#36333f'" @click="headBarRightClick"></iconComponent>
      </div>
      <div class="body">
        <div class="album">
          <div class="ablumPic">
            <img :src="bodyState.list && bodyState.list[0]?.al.picUrl">
          </div>
          <div class="heiJiao">
            <img src="@/assets/img/changpian.webp">
          </div>
        </div>
        <div class="songInfo">
          <div class="wordArt">{{ bodyState.list && bodyState.list[0]?.name }}</div>
          <div class="albumArt">
            <div class="singer">{{ bodyState.list && bodyState.list[0]?.ar[0]?.name }}</div>
          </div>
        </div>
      </div>
      <div class="list" ref="listRef">
        <div class="list-content">
            <div
             class="list-item"
             v-for="(item, index ) in bodyState.list"
             :key="index"
             :class="{active: index == bodyState.currentIndex}"
             @click="play(item, index)">
              <div class="item-left">
                <iconComponent :iconPath=" index == bodyState.currentIndex ? 'icon-light-fill' : 'icon-light' " :iconColor="'#8b0000'"></iconComponent>
              </div>
              <div class="item-center">
                <div class="center-left">
                  <div class="pic">
                    <img v-lazy="item.al.picUrl + '?param=200y200'">
                  </div>
                </div>
                <div class="center-right">
                  <div class="songName">{{ item.name }}</div>
                  <div class="singer">{{ item.ar[0]?.name }}</div>
                </div>
              </div>
              <div class="item-right">
                <div class="duration">04:56</div>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Body from './index';
export default Body;
</script>
<style scoped lang="scss">
  @import "index";
</style>