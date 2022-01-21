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
import Lyric from '@/assets/js/user-lyric.js';
export default function userLycis(){
    const lyrics = ref([]);
    const store = useStore();
    const currentSongs = computed(() => store.getters.getCurrentSongs);
    const fullScreen = computed(() => store.state.fullScreen);
    const lyricMap = {};
    watch(currentSongs, async (newVal, oldVal) => {
        if(!fullScreen.value){
            return;
        }
        let songId = newVal.id;
        if(!!lyricMap[songId]){
            lyrics.value = util.formatLyric(lyricMap[songId]);
            return;
        }
        const { id } = newVal;
        const { lrc, code } = await Player.getSongLyric( { id } );
        if(code == 200 && Object.keys(lrc).length){
            lyricMap[id] = {
                lyric: lrc.lyric,
                songName: newVal.name
            }
            const newLyric = new Lyric(lrc.lyric);
            newLyric.seek();
            lyrics.value = util.formatLyric(lrc.lyric);
            store.commit('saveLyric',{ lyric: lrc.lyric, song: newVal })
        }
    });
    function getLyricIndex(currentTime){
        let min = currentTime / 60;
        let sec = currentTime % 60;
        let _lyrics =lyrics.value;
        // _lyrics.forEach(ele => {

        // })
    }
    return {
        getLyricIndex
    }
}