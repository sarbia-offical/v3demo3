const getters = {
    getCurrentSongs: (state) => state['playList'][state.currentIndex]
}
export default getters;