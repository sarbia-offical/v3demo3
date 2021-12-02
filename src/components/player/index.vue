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
            :iconPath="'icon-gequpaihang_fill'"
            :iconColor="'#000000'"
          ></iconComponent>
        </div>
      </div>
      <div :style="artistStyle">
        <!-- {{ singer?.artist?.cover }} -->
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
        marginTop: '.3rem',
        height: '70vh',
        width: '100%',
        backgroundImage: `url(${singer.artist.cover}?param=375y375)`,
        backgroundSize: 'cover'
      }
    })
    watch(currentSongs, async (newVal, oldVal) => {
      console.log(currentSongs);
      const res = await Player.getSongUrl(newVal.id);
      const audioEle = audioRef.value;
      audioEle.src = res.data[0].url;
      // audioEle.play();
    });
    const small = () => {
      store.commit("setFullScreen", false);
    };
    return {
      currentSongs,
      fullScreen,
      singer,
      audioRef,
      small,
      artistStyle
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
  .topContent {
    width: 100%;
    height: 0.625rem;
    @include aic_jcsb();
    .circleBtn {
      width: 0.5rem;
      height: 0.5rem;
      background-color: #fbf6f6;
      padding: 0.1rem;
      @include aic_jcc();
      box-shadow: 3px 4px 4px 0px #e5d9d9;
      border-radius: 50%;
    }
  }
  .bodyContent{
    margin-top: .3rem;
    height: 70vh;
    width: 100%;
    background-image: url('http://p1.music.126.net/LCWqYYKoCEZKuAC3S3lIeg==/109951165034938865.jpg?param=375y375');
    background-size: cover;
  }
}
</style>