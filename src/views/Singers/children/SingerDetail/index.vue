<template>
  <div class="singerDetail">
    <topNavBar :texts="state.texts" @leftClick="leftClick" ref="topNavBarRef"></topNavBar>
    <div v-loading:[loadingText]="{flag: loading}"></div>
    <div style="width: 100vw; overflow: hidden">
      <div class="bg-image" :style="bgImageStyle" ref="bgImageRef">
        <div class="filter"></div>
        <div class="singerInfo">
          <p>{{ state.artist.name }}</p>
          <div v-for="(item, index) in state.artist.alias" :key="index" class="artist">
            <div>{{ item }}</div>
          </div>
        </div>
      </div>
    </div>
    <div style="width: 100vw; overflow: hidden">
      <div class="songs" 
      @touchstart.prevent="touchStart"
      @touchmove.prevent="touchMove"
      @touchend.prevent="touchDown"
      ref="songsRef">
      <div class="singer-opus">
        <van-swipe :show-indicators="false" :loop="false" @change="swipeChange">
          <template #indicator="{ active }">
            <div class="swipe-indicator">

              <div :class="{ indicator: true, indicatorActive: active == 0 }">歌曲</div>
              <div :class="{ indicator: true, indicatorActive: active == 1 }">专辑</div>
              <div class="swipe-icon" @click="goTop">
                <iconComponent :iconPath="'icon-gengduo'" :iconColor="'#36333f'"></iconComponent>
              </div>
            </div>
          </template>
          <!-- 歌曲 -->
          <van-swipe-item>
            <div class="songsScroll" ref="songsScrollRef">
              <div class="songsScroll-content">
                <div v-for="(item, index) in state.list" :key="index" class="songs-item">
                  <div class="pic" @click="choseSongeItem(item, index)">
                    <img v-lazy="item['al'].picUrl + '?param=200y200'">
                  </div>
                  <div class="singer">
                    <div class="van-multi-ellipsis--l2">{{ item.name }}</div>
                    <div class="albumName">
                      <div class="van-multi-ellipsis--l2">{{ item['al'].name }}</div>
                    </div>
                  </div>
                  <div class="other" @click="choseSongeItem(item, index)">
                    <div class="loadMore">
                      <iconComponent
                        :iconPath="'icon-huiyuan_fill'"
                        :iconColor="'#8b0000'">
                      </iconComponent>
                    </div>
                  </div>
                </div>
                <div style="height: 1.3rem"></div>
              </div>
            </div>
          </van-swipe-item>
          <!-- 专辑 -->
          <van-swipe-item>
            <div class="albumsScroll" ref="albumsScrollRef">
              <div>
              <div class="albumsScroll-content">
                <div v-for="(item, index) in state.ablumList" :key="index" class="album-item">
                  <div class="pic">
                    <img v-lazy="item.picUrl + '?param=200y200'">
                    <div class="tips" v-if="!!item.subType">
                      {{ item.subType }}
                    </div>
                  </div>
                  <div class="info">
                    <div class="name">
                      <div class="van-multi-ellipsis--l2">
                        {{ item.name }}
                      </div>
                    </div>
                    <div class="company">
                      <div class="van-multi-ellipsis--l2">发行商：{{ item.company }}</div>
                    </div>
                  </div>
                </div>
              </div>
                <div style="height: 1.3rem; width: 100vw"></div>
              </div>

            </div>
          </van-swipe-item>
        </van-swipe>

      </div>
      </div>
    </div>
  </div>
</template>

<script>
import SingerDetail from './index.js';
export default SingerDetail;
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>