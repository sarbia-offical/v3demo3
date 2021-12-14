/*
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2021-12-01 09:54:11
 * @LastEditors: zouwenqin
 * @LastEditTime: 2021-12-02 15:16:14
 */
import util from '../assets/js/util';
import constant from '../assets/js/constant';
const actions = {
    // 设置播放器各参数
    initialMusicPlay: (state, { list, playMode }) => {
        state.commit('setFullScreen', false);
        state.commit('setPlayMode', playMode);
        state.commit('setPlaying', false);
        state.commit('setPlayList', list);
        state.commit('setSequenceList', list);
    },
    // 设置开始播放
    setMusicPlay: (state, index) => {
        state.commit('setCurrentIndex', index);
        state.commit('setFullScreen', true);
        state.commit('setPlaying', true);
    },
    // 设置播放器的歌曲随机播放
    randomPlay: (state, { list, index, playMode }) => {
        let originList = list.slice();
        util.shuffle(originList);
        state.commit('setCurrentIndex', index);
        state.commit('setFullScreen', true);
        state.commit('setPlayMode', playMode);
        state.commit('setPlaying', true);
        state.commit('setPlayList', originList);
        state.commit('setSequenceList', list);
    },
    // 根据播放模式设置不同的歌曲列表
    changeMode: ({ state, commit, getters }, mode ) => {
        let currentId = getters.getCurrentSongs.id;
        console.log(currentId);
        if(mode == constant.PLAY_MODE.random){
            console.log(state.sequenceList);
            // console.log(util.shuffle(arr));
            commit('setPlayList', util.shuffle(state.sequenceList))
        } else {
            commit('setPlayList', state.sequenceList);
        }
        let currentIndex = state.playList.findIndex(ele => ele.id == currentId)
        commit('setCurrentIndex', currentIndex);
        commit('setPlayMode', mode);
    },

    test: ( { commit, dispatch, state } ) => {
        console.log(commit);
    }
}
export default actions;