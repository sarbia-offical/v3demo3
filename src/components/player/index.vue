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
            <div @click="small">缩小</div>
        </div>
    </div>
</template>

<script>
import { computed, defineComponent, watch, ref } from "vue";
import { useStore } from "vuex";
import Player from '@/service/player.service';
export default defineComponent({
  name: "Player",
  setup() {
    const store = useStore();
    const audioRef = ref(null);
    const currentSongs = computed(() => store.getters.getCurrentSongs);
    const fullScreen = computed(() => store.state.fullScreen);
    watch(currentSongs, async (newVal, oldVal) => {
        console.log(currentSongs);
        const res = await Player.getSongUrl(newVal.id);
        const audioEle = audioRef.value;
        audioEle.src = res.data[0].url;
        audioEle.play();
    })
    const small = () => {
        store.commit('setFullScreen', false);
    }
    return  {
        currentSongs,
        fullScreen,
        audioRef,
        small
    }
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
  background-color: #a79494;
  z-index: 99999;
  opacity: .5;
}
</style>