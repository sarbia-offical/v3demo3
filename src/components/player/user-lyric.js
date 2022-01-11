/*
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2022-01-10 10:04:21
 * @LastEditors: zouwenqin
 * @LastEditTime: 2022-01-10 15:18:53
 */
import { watch, computed } from 'vue';
import { useStore } from 'vuex';
import Player from "@/service/player.service";
export default function userLycis(){
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
            console.log(lyricMap);
            return;
        }
        const { id } = newVal;
        const { lrc, code } = await Player.getSongLyric( { id } );
        if(code == 200 && Object.keys(lrc).length){
            lyricMap[id] = {
                lyric: lrc.lyric,
                songName: newVal.name
            }
            store.commit('saveLyric',{ lyric: lrc.lyric, song: newVal })
        }
    })
}