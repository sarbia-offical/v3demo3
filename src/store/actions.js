/*
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2021-12-01 09:54:11
 * @LastEditors: zouwenqin
 * @LastEditTime: 2021-12-02 15:16:14
 */
import util from '../assets/js/util';
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
        util.shuffle(originList);
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
export default actions;