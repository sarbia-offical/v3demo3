<!--
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2021-11-15 10:37:05
 * @LastEditors: zouwenqin
 * @LastEditTime: 2022-01-14 11:53:04
-->
<template>
  <div class="home">
    <Body @lftClick="headBarLeftClick" @rgtClick="headBarRightClick"></Body>
    <div class="searchInput">
      <div class="inputBlock">
        <div class="choseType">
          <iconComponent :iconPath="'icon-fenlei'" :iconColor="'#008000'" @click="typeCheck"></iconComponent>
        </div>
        <div class="other">
          <input type="text" placeholder="歌曲/专辑/歌手，左侧图标可切换类型" v-model="searchText">
          <div class="btn" @click="search">搜索 🔍</div>
        </div>
      </div>
    </div>
    <div class="history" @click="choseTag" v-if="false">
      <div class="tags">
        <span class="tag" v-for="(item, index) in 8" :key="index" :data-currentIndex="index">AAAA</span>
      </div>
    </div>
    <van-popup v-model:show="state.showLeft" position="left" class="leftPopup" :style="{ width: '80vw', height: '100vh' }">
      <SidebarMenu></SidebarMenu>
    </van-popup>
    <van-popup v-model:show="state.showRight" position="right" class="rightPopup" :style="{ width: '50vw', height: '100vh' }">

    </van-popup>
    <van-popup v-model:show="state.flag" position="center" :style="{ width: '60vw', height: '30vh' }">
      <div style="width: 100%; height: 100%">
        <van-radio-group v-model="radio">
          <van-cell-group>
            <van-cell title="歌曲" clickable @click="radio = '0'">
              <template #right-icon>
                <van-radio name="0" />
              </template>
            </van-cell>
            <van-cell title="专辑" clickable @click="radio = '1'">
              <template #right-icon>
                <van-radio name="1" />
              </template>
            </van-cell>
            <van-cell title="歌手" clickable @click="radio = '2'">
              <template #right-icon>
                <van-radio name="2" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>
    </van-popup>
    <router-view v-slot="{ Component }">
      <transition appear name="slider">
        <component :is="Component"></component>
      </transition>
    </router-view>
  </div>
</template>
<script>
import Home from './index.js';
export default Home;
</script>
<style scoped lang="scss">
  @import "index.scss";
</style>
 No newline at end of file
