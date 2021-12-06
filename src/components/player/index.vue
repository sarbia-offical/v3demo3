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
    <audio ref="audioRef" class="audioComponent"></audio>
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
        <div class="circleBtn toolsBtn">
          <iconComponent
            :iconPath="'icon-shangyishou_huaban'"
            :iconColor="'#000000'"
            :fontSize="'30px'"
          ></iconComponent>
        </div>
        <div class="circleBtn toolsBtn">
          <iconComponent
            :iconPath="'icon-kaishi_fill'"
            :iconColor="'#000000'"
            :fontSize="'50px'"
          ></iconComponent>
        </div>
        <div class="circleBtn toolsBtn">
          <iconComponent
            :iconPath="'icon-shangyishou_huaban-copy'"
            :iconColor="'#000000'"
            :fontSize="'30px'"
          ></iconComponent>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, watch, ref } from "vue";
import { useStore } from "vuex";
import Player from "@/service/player.service";
export default defineComponent({
  name: "Player",
  setup() {
    const store = useStore();
    const audioRef = ref(null);
    const currentSongs = computed(() => store.getters.getCurrentSongs);
    const fullScreen = computed(() => store.state.fullScreen);
    const singer = computed(() => store.state.singer);
    const artistStyle = computed(() => {
      console.log(store.state);
      const singer = store.state.singer;
      return {
        position: "relative",
        marginTop: ".3rem",
        height: "50vh",
        width: "100%",
        backgroundImage: `url(${singer?.artist?.cover}?param=375y375)`,
        backgroundSize: "cover"
      };
    });
    watch(currentSongs, async (newVal, oldVal) => {
      const res = await Player.getSongUrl(newVal.id);
      const audioEle = audioRef.value;
      audioEle.src = res.data[0].url;
      // audioEle.play();
    });
    const small = () => {
      store.commit("setFullScreen", false);
    };
    return {
      store,
      currentSongs,
      fullScreen,
      singer,
      audioRef,
      small,
      artistStyle,
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
    box-shadow: 6px 6px 0px 0px #cdc8cf;
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