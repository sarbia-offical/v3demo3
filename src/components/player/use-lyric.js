/*
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2022-01-10 10:04:21
 * @LastEditors: zouwenqin
 * @LastEditTime: 2022-01-21 20:54:01
 */
import { watch, computed, ref } from 'vue';
import { useStore } from 'vuex';
import Player from "@/service/player.service";
import util from '@/assets/js/util.js';
import Lyric from '@/assets/js/lyric.js';
export default function useLycis(currentTime){
    // ref
    const lyrics = ref([]);
    const currentLyric = ref(null);
    ref();
    // vuex
    const store = useStore();
    // computed
    const currentSongs = computed(() => store.getters.getCurrentSongs);
    const fullScreen = computed(() => store.state.fullScreen);
    // 歌词缓存
    const lyricMap = {};
    watch(currentSongs, async (newVal, oldVal) => {
        if(!fullScreen.value){
            return;
        }
        let songId = newVal.id;
        if(!!lyricMap[songId]){
            lyrics.value = util.formatLyric(lyricMap[songId]);
            playLyric();
        }
        const { id } = newVal;
        const { lrc, code } = await Player.getSongLyric( { id } );
        if(code == 200 && Object.keys(lrc).length){
            lyricMap[id] = {
                lyric: lrc.lyric,
                songName: newVal.name
            }
            currentLyric.value = new Lyric(lrc.lyric, handleFunc);
            console.log(currentLyric.value);
            lyrics.value = util.formatLyric(lrc.lyric);
            store.commit('saveLyric',{ lyric: lrc.lyric, song: newVal });
            playLyric();
        }
        console.log(lyrics.value);
    });
    function playLyric(){
        // 1、先根据时间找出歌词
        let index = getLyricIndex(lyrics, currentTime.value * 1000);
        
        console.log(index);
    }
    function getLyricIndex(lyrics, currentTime){
        if(!!!lyrics.value || lyrics.value.length == 0){
            return 0;
        }
        for(let i = 0; i < lyrics.value.length; i++){
            if(currentTime <= lyrics.value[i].time){
                return i;
            }
        }
        return lyrics.value.length - 1;
    }
    function handleFunc(obj){
        console.log(obj);
    }
    return {
        playLyric
    }
}