const getters = {
    getCurrentSongs: (state) => state['playList'][state.currentIndex] || {},
    getFullScreen: (state) => state.fullScreen
}
export default getters;