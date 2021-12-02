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
    }
}
export default mutations;