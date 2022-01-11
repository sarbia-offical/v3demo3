import { computed, defineComponent, watch, ref, nextTick } from "vue";
import { useStore } from "vuex";
import Player from "@/service/player.service";
import ImgPopup from '@/components/imgPopup/index.vue';
import constant from '@/assets/js/constant';
import util from '../../assets/js/util';
import progressBar from '@/components/progressBar/index.vue'
import userLyric from "./user-lyric";
export default defineComponent({
  name: "Player",
  components: {
    ImgPopup,
    progressBar
  },
  setup() {
    // ref
    const store = useStore();
    const audioRef = ref(null);
    const audioStatus = ref(false);
    const show = ref(false);
    const durationText = ref({});
    const currentTimeText = ref({});
    const duration = ref(0);
    const process = ref(0);
    const processFlag = ref(false);
    // computed
    const currentSongs = computed(() => store.getters.getCurrentSongs);
    const fullScreen = computed(() => store.state.fullScreen);
    const singer = computed(() => store.state.singer);
    const playMode = computed(() => store.state.playMode);
    const artistStyle = computed(() => {
      const audioEle = audioRef.value;
      const singer = store.state.singer;
      let cs = currentSongs.value;
      let url = cs['al'] ? cs['al'].picUrl : '';
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
    // watch
    watch(currentSongs, async (newVal, oldVal) => {
      if(!fullScreen.value){
        return;
      }
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
      if(playing.value){
        audioEle.play();
      }
    });

    watch(playing, (newVal, oldVal) => {
      const audioEle = audioRef.value;
      if(newVal){
        audioEle.play();
      }
    })

    watch(fullScreen, (newVal, oldVal) => {
      const audioEle = audioRef.value;
      if(newVal && audioEle.currentTime > 0){
          audioEle.play();
      }
    })

    // hooks
    userLyric();

    // methods
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
        store.commit('setPlaying', true);
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
        store.commit('setPlaying', true);
      }
    }
    // 循环播放
    const loop = () => {
      const audioEle = audioRef.value;
      audioEle.currentTime = 0;
      audioEle.play();
      store.commit('setPlaying', true);
    }
    // 进度条
    const updateTime = (e) => {
      if(processFlag.value){
        return;
      }
      process.value = e.target.currentTime / duration.value;
      const currentTime = e.target.currentTime;
      let minutes = util.buling(parseInt(currentTime / 60));
      let second = util.buling(parseInt(currentTime % 60));
      currentTimeText.value = {
        'minutes': minutes,
        'second': second
      }
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
    // 获取歌曲时长
    const durationChange = () => {
      const audioEle = audioRef.value;
      const durationx = audioEle.duration;
      console.log(durationx);
      let minutes = util.buling(parseInt(durationx / 60));
      let second = util.buling(parseInt(durationx % 60));
      durationText.value = {
        'minutes': minutes,
        'second': second
      }
      duration.value = audioEle.duration;
    }
    // 随机播放
    const randomPlay = () => {
      let status = constant.PLAY_MODE.random;
      if(playMode.value == constant.PLAY_MODE.random){
        status = constant.PLAY_MODE.sequence;
      }
      store.dispatch('changeMode', status)
    }
    // 重复播放
    const loopPlay = () => {
      let status = constant.PLAY_MODE.loop;
      if(playMode.value == constant.PLAY_MODE.loop){
        status = constant.PLAY_MODE.sequence;
      }
      store.dispatch('changeMode', status)
    }
    // 进度条移动事件
    const progressTouchMove = process => {
      processFlag.value = true;
    }
    // 进度条停止拖动
    const progressTouchEnd = process => {
      console.log(process);
      const audioEle = audioRef.value;
      audioEle.currentTime = duration.value * process;
      if(!playing.value){
        store.commit('setPlaying', true);
      }
      processFlag.value = false;
    }
    // 意外情况暂停歌曲
    const audioPause = () => {
      store.commit('setPlaying', false);
    }
    // 大图展示
    const showBigPic = () => {
      show.value = true;
    }
    // 关闭图片popup
    const closePopup = () => {
      show.value = false;
    }
    // 切换swipe
    const swipeChange = () => {

    }
    return {
      store,
      currentSongs,
      fullScreen,
      singer,
      playMode,
      audioRef,
      artistStyle,
      playing,
      audioStatus,
      show,
      durationText,
      currentTimeText,
      process,
      small,
      playMusic,
      durationChange,
      progressTouchMove,
      progressTouchEnd,
      audioPause,
      prev,
      next,
      updateTime,
      showBigPic,
      closePopup,
      randomPlay,
      loopPlay,
      swipeChange
    };
  },
});