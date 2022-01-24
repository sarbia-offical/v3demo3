<!--
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2022-01-12 16:28:08
 * @LastEditors: zouwenqin
 * @LastEditTime: 2022-01-18 17:21:29
-->
<template>
  <div class="searchPage" v-loading:[loadingText]="{ flag: loading }">
    <topNavBar :texts="texts" @leftClick="leftClick"></topNavBar>
    <!-- 歌手 -->
    <div class="singer-container">
      <div class="tips">歌手</div>
      <div class="scroll-wrapper" ref="singerScroll">
        <div class="scroll-content">
          <div
            class="scroll-item"
            v-for="(item, index) in state.searchAll[2]?.arr"
            :key="index"
            @click="jump1(item)"
          >
            <div class="singer-avatar2">
              <div class="pic">
                <img v-lazy="item.picUrl + '?param=100y100'" />
              </div>
            </div>
            <div class="text">
              <div>
                <p
                  class="van-ellipsis"
                  style="width: 1.4rem; color: #969696; font-size: 0.2rem"
                >
                  {{ item.name }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 专辑 -->
    <div class="album-container">
      <div class="tips">专辑</div>
      <div class="scroll-wrapper" ref="albumScroll">
        <div class="scroll-content">
          <div
            class="scroll-item"
            v-for="(item, index) in state.searchAll[1]?.arr"
            :key="index"
          >
            <div class="singer-avatar">
              <div class="pic">
                <img v-lazy="item.picUrl + '?param=200y200'" />
              </div>
            </div>
            <div class="text">
              <div>
                <p class="van-ellipsis" style="width: 2rem; color: #969696;">{{ item.name }}</p>
              </div>
              <div style="color: #969696; font-size: 0.2rem">
                {{ item.artist.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 歌曲 -->
    <div class="songs-container">
      <div class="tips">歌曲</div>
      <div class="songsScroll" ref="songsScroll">
        <div class="songsScroll-content">
          <div
            v-for="(item, index) in state.searchAll[0]?.arr"
            :key="index"
            class="songs-item"
          >
            <div class="pic" @click="choseSongeItem(item, index)">
              <img v-lazy="item['al'].picUrl + '?param=200y200'" />
            </div>
            <div class="singer">
              <div class="van-multi-ellipsis--l2">{{ item.name }}</div>
              <div class="albumName">
                <div class="van-multi-ellipsis--l2">{{ item["al"].name }}</div>
              </div>
            </div>
            <div class="other" @click="choseSongeItem(item, index)">
              <div class="loadMore">
                <iconComponent
                  :iconPath="'icon-huiyuan_fill'"
                  :iconColor="'#8b0000'"
                >
                </iconComponent>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SearchPage from "./index";
export default SearchPage;
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>