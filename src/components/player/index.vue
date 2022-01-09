<!--
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2021-12-02 08:24:57
 * @LastEditors: zouwenqin
 * @LastEditTime: 2022-01-05 10:09:05
-->
<template>
  <div v-show="fullScreen">
    <audio ref="audioRef" class="audioComponent" 
      @pause="audioPause"
      @canplay="audioCanplay"
      @durationchange="durationChange"
      @timeupdate="updateTime">
    </audio>
    <div class="player">
      <div class="topContent">
        <div class="circleBtn" @click="small">
          <iconComponent
            :iconPath="'icon-jiantou34'"
            :iconColor="'#000000'"
          ></iconComponent>
        </div>
        <div class="circleBtn">
          <iconComponent
            :iconPath="'icon-xianhua'"
            :iconColor="'#000000'"
            @click="showBigPic"
          ></iconComponent>
        </div>
      </div>
      <div :style="artistStyle" class="artistShadow">
      </div>
      <div class="detail">
        <div class="songName">
          {{ currentSongs.name }}
          <div class="playMode">
            {{ playMode == 0 ? '顺序播放' : playMode == 1 ? '单曲循环' : '随机播放' }}中...
          </div>
        </div>
        <div class="singers">
          <div
            v-for="(item, index) in currentSongs.ar"
            :key="index"
            class="singer">
            {{ item.name }}
          </div> &nbsp;/
          <div>
            专辑：{{ currentSongs['al']?.name }}
          </div>
        </div>
      </div>
      <div class="progressBar">
        <div class="progressCurrentTime">{{ currentTimeText.minutes }}:{{ currentTimeText.second }}</div>
        <!-- <div class="bar"></div> -->
        <div class="center">
          <progressBar 
          :progress="process"
          @touchMove="progressTouchMove"
          @touchEnd="progressTouchEnd">
          </progressBar>
        </div>
        <div class="progressDuration">{{ durationText.minutes }}:{{ durationText.second }}</div>
      </div>
      <div class="tools">
        <div class="circleBtn toolsBtn" @click="randomPlay">
          <iconComponent
              :iconPath="'icon-suijibofang'"
              :iconColor="playMode == 2 ? '#808080' : '#000000'"
              :fontSize="'20px'"
          ></iconComponent>
        </div>
        <div class="circleBtn toolsBtn" @click="prev">
          <iconComponent
            :iconPath="'icon-shangyishou_huaban'"
            :iconColor="'#000000'"
            :fontSize="'30px'"
          ></iconComponent>
        </div>
        <div class="circleBtn toolsBtn" @click="playMusic">
          <iconComponent
            :iconPath=" !playing ? 'icon-kaishi_fill' : 'icon-zanting_fill'"
            :iconColor="'#000000'"
            :fontSize="'50px'"
          ></iconComponent>
        </div>
        <div class="circleBtn toolsBtn" @click="next">
          <iconComponent
            :iconPath="'icon-shangyishou_huaban-copy'"
            :iconColor="'#000000'"
            :fontSize="'30px'"
          ></iconComponent>
        </div>
        <div class="circleBtn toolsBtn" @click="loopPlay">
          <iconComponent
              :iconPath="'icon-danquxunhuan'"
              :iconColor="playMode == 1 ? '#808080' : '#000000'"
              :fontSize="'20px'"
          ></iconComponent>
        </div>
      </div>
    </div>
    <ImgPopup :show="show" @close="closePopup"></ImgPopup>
  </div>
</template>

<script>
  import Player from './index';
  export default Player;
</script>

<style scoped lang="scss">
@import "index";
</style>