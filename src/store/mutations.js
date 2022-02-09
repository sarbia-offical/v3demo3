/*
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2021-12-03 08:43:49
 * @LastEditors: zouwenqin
 * @LastEditTime: 2022-01-10 15:18:42
 */
const mutations = {
    // 设置播放歌曲的下标
    setCurrentIndex: (state, currentIndex) => {
        state.currentIndex = currentIndex;
    },
    // 设置是否进行全屏展示
    setFullScreen: (state, fullScreen) => {
        state.fullScreen = fullScreen;
    },
    // 设置播放模式
    setPlayMode: (state, playMode) => {
        state.playMode = playMode;
    },
    // 设置是否正在播放
    setPlaying: (state, playing) => {
        state.playing = playing;
    },
    // 设置播放列表
    setPlayList: (state, playList) => {
        state.playList = playList;
    },
    // 设置歌曲顺序列表
    setSequenceList: (state, sequenceList) => {
        state.sequenceList = sequenceList;
    },
    // 设置歌手
    setSinger: (state, singer) => {
        state.singer = singer;
    },
    // 设置歌词
    saveLyric: (state, { song, lyric }) => {
        console.log(lyric);
        console.log(song);
        let list = state.sequenceList;
        list.map(ele => {
            if(ele.id == song.id){
                ele['lyric'] = lyric;
            }
            return ele;
        })
    }
}
export default mutations;