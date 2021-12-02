/*
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2021-12-01 09:54:11
 * @LastEditors: zouwenqin
 * @LastEditTime: 2021-12-02 09:52:32
 */
import PLAY_MODE from '@/assets/js/constant';
const state = {
    currentIndex: 0,
    fullScreen: false,
    playMode: PLAY_MODE.sequence,
    playing: false,
    playList: [],
    sequenceList: [],
    singer: {}
}
export default state;