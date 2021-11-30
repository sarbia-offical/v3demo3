const actions = {
    // 设置播放器各参数
    setMusicPlay: (state, { list, index, playMode }) => {
        state.commit('setCurrentIndex', index);
        state.commit('setFullScreen', true);
        state.commit('setPlayMode', playMode);
        state.commit('setPlaying', true);
        state.commit('setPlayList', list);
        state.commit('setSequenceList', list);
    },
    // 设置播放器的歌曲随机播放
    randomPlay: (state, { list, index, playMode }) => {
        let originList = list.slice();
        for(let i = 0; i < originList.length; i ++ ){
            let j = random(i);
            swap(originList, i ,j)
        }
        state.commit('setCurrentIndex', index);
        state.commit('setFullScreen', true);
        state.commit('setPlayMode', playMode);
        state.commit('setPlaying', true);
        state.commit('setPlayList', originList);
        state.commit('setSequenceList', list);
    },
    test: ( { commit, dispatch, state } ) => {
        console.log(commit);
    }
}
const random = (i) => Math.floor( Math.random() * (i + 1) )
const swap = (arr, i, j) => {
    let t = arr[i];
    arr[i] = arr[j];
    arr[j] = t;
}
export default actions;