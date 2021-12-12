// 常量文件

/**
 * 播放模式
 * sequence 顺序
 * loop 循环播放
 * random 随机播放
 * @type {{sequence: number, random: number, loop: number}}
 */
const PLAY_MODE = {
    sequence: 0,
    loop: 1,
    random: 2
}
/**
 *   超时错误
 * @type {{ECONNABORTED: string}}
 */
const ERROR_CODE = {
    ECONNABORTED: '500'
}
export default {
    PLAY_MODE,
    ERROR_CODE
};