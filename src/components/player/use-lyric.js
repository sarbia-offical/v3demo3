/*
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2022-01-10 10:04:21
 * @LastEditors: zouwenqin
 * @LastEditTime: 2022-02-08 11:58:10
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
            currentLyric.value = new Lyric(lyrics.value, handleFunc);
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
            lyrics.value = util.formatLyric(lrc.lyric);
            console.log(lyrics.value);
            store.commit('saveLyric',{ lyric: lrc.lyric, song: newVal });
            playLyric();
        }
        console.log(lyrics.value);
    });
    function playLyric(){
        let lyricInstance = currentLyric.value
        // 1、先根据时间找出歌词
        if(!!lyricInstance){
            lyricInstance.seek(currentTime.value);
        }
    }
    function handleFunc(obj){
        console.log(obj);
    }
    return {
        playLyric
    }
}