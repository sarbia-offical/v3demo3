<!--
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2021-12-02 08:24:57
 * @LastEditors: zouwenqin
 * @LastEditTime: 2021-12-02 09:31:48
-->
<template>
  <div v-show="fullScreen">
    <audio ref="audioRef" class="audioComponent" 
      @pause="audioPause"
      @canplay="audioCanplay">
    </audio>
    <div class="player">
      <div class="topContent" @click="small">
        <div class="circleBtn">
          <iconComponent
            :iconPath="'icon-jiantou34'"
            :iconColor="'#000000'"
          ></iconComponent>
        </div>
        <div class="circleBtn">
          <iconComponent
            :iconPath="'icon-xianhua'"
            :iconColor="'#000000'"
          ></iconComponent>
        </div>
      </div>
      <div :style="artistStyle" class="artistShadow">
        <!-- <div class="lyric"></div> -->
      </div>
      <div class="detail">
        <div class="songName">{{ currentSongs.name }}</div>
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
      <div class="tools">
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
      </div>
      <div class="progressBar"></div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, watch, ref } from "vue";
import { useStore } from "vuex";
import Player from "@/service/player.service";
import state from "@/store/state";
export default defineComponent({
  name: "Player",
  setup() {
    
    const store = useStore();
    const audioRef = ref(null);
    const audioStatus = ref(false);
    const currentSongs = computed(() => store.getters.getCurrentSongs);
    const fullScreen = computed(() => store.state.fullScreen);
    const singer = computed(() => store.state.singer);
    const artistStyle = computed(() => {
      const singer = store.state.singer;
      let cs = currentSongs.value;
      console.log(cs)
      let url = cs['al'] ? cs['al'].picUrl : '';
      console.log(url);
      if(!!!url){
        url = singer?.artist?.cover;
      }
      return {
        position: "relative",
        marginTop: ".3rem",
        height: "50vh",
        width: "100%",
        backgroundImage: `url(${url}?param=375y375)`,
        backgroundSize: "cover"
      };
    });
    const playing = computed(() => store.state.playing);
    const playList = computed(() => store.state.playList);
    const currentIndex = computed(() => store.state.currentIndex);

    watch(currentSongs, async (newVal, oldVal) => {
      console.log(newVal)
      if(!newVal.id){
        return ;
      }
      const res = await Player.getSongUrl(newVal.id);
      const audioEle = audioRef.value;
      if(!res.data[0].url){
        store.commit('setPlaying', !store.state.playing)
        return;
      }
      audioStatus.value = true;
      audioEle.src = res.data[0].url;
      store.commit('setPlaying', true);
      audioEle.play();
    });

    // 缩小事件
    const small = () => {
      store.commit("setFullScreen", false);
    };
    // 上一首歌曲
    const prev = () => {
      const list = playList.value;
      if(list.length == 1){
        loop();
      } else {
        let index = currentIndex.value - 1;
        if(index == -1){
          index = list.length - 1;
        }
        store.commit('setCurrentIndex', index);
      }
    }
    // 下一首歌曲
    const next = () => {
      const list = playList.value;
      if(list.length == 1){
        loop();
      } else {
        let index = currentIndex.value + 1;
        if(index == list.length){
          index = 0;
        }
        store.commit('setCurrentIndex', index);
      }
    }
    // 循环播放
    const loop = () => {
      const audioEle = audioRef.value;
      audioEle.currentTime = 0;
      audioEle.play();
      store.commit('setPlaying', true);
    }
    // 播放歌曲
    const playMusic = () => {
      const audioEle = audioRef.value;
      console.log(audioEle.paused);
      if(!store.state.playing){
        audioEle.play();
      } else {
        audioEle.pause();
      }
      store.commit('setPlaying', !store.state.playing)
    }
    // 歌曲缓冲
    const audioCanplay = () => {
      if(!audioStatus.value) return;
      audioStatus.value = true
    }
    // 意外情况暂停歌曲
    const audioPause = () => {
      store.commit('setPlaying', false);
    }
    return {
      store,
      currentSongs,
      fullScreen,
      singer,
      audioRef,
      artistStyle,
      playing,
      audioStatus,
      small,
      playMusic,
      audioPause,
      prev,
      next,
    };
  },
});
</script>

<style scoped lang="scss">
.player {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fdfbfb;
  z-index: 99999;
  padding: 0.25rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .artistShadow{
    box-shadow: 2px 2px 12px 0 rgba(0,0,0,.1);
    border-radius: 5px;
  }
  .circleBtn {
    width: 0.5rem;
    height: 0.5rem;
    background-color: #fbf6f6;
    padding: 0.1rem;
    @include aic_jcc();
    box-shadow: 3px 4px 4px 0px #e5d9d9;
    border-radius: 50%;
  }
  .topContent {
    width: 100%;
    height: 0.625rem;
    @include aic_jcsb();
  }
  .bodyContent {
    margin-top: 0.3rem;
    height: 70vh;
    width: 100%;
    background-image: url("http://p1.music.126.net/LCWqYYKoCEZKuAC3S3lIeg==/109951165034938865.jpg?param=375y375");
    background-size: cover;
  }
  .lyric {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 90vw;
    height: 20vh;
    background-color: #242326;
    border-top-left-radius: 0.7rem;
    border-bottom-left-radius: 0.7rem;
  }
  .detail{
    flex: .6;
    width: 90vw;
    margin: 0 auto;
    margin-top: 1vh;
    @include aic_jcc();
    flex-direction: column;
    .songName{
      font-family: hyxhkj;
      font-size: 0.575rem;
    }
    .singers{
      margin-top: .3rem;
      color: #888888;
      @include aic_jcc();
      font-size: .3rem;
      div ~ div{
        margin-left: .2rem;
      }
    }
  }
  .tools {
    width: 100%;
    @include aic_jcsb();
    justify-content: space-evenly;
    .toolsBtn{
      width: auto;
      height: auto;
      transition: box-shadow .2s ease-out;
    }
    .toolsBtn:active{
      @include shadow2-2();
    }
  }
}
</style>