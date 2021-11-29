const actions = {
    setMusicPlay: (state, { list, index, playMode }) => {
        state.commit('setCurrentIndex', index);
        state.commit('setFullScreen', true);
        state.commit('setPlayMode', playMode);
        state.commit('setPlaying', true);
        state.commit('setPlayList', list);
        state.commit('setSequenceList', list);
    },
    test: ( { commit, dispatch, state } ) => {
        console.log(commit);
    }
}
export default actions;