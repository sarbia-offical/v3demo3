/*
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2021-12-01 09:54:11
 * @LastEditors: zouwenqin
 * @LastEditTime: 2022-01-10 11:52:49
 */
import PLAY_MODE from '@/assets/js/constant';
const state = {
    currentIndex: null,
    fullScreen: false,
    playMode: PLAY_MODE.sequence,
    playing: false,
    playList: [],
    sequenceList: [],
    singer: {}
}
export default state;