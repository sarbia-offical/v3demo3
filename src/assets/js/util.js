/*
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2021-12-02 09:53:04
 * @LastEditors: zouwenqin
 * @LastEditTime: 2022-01-21 17:15:00
 */
const random = (i) => Math.floor( Math.random() * (i + 1) );
const timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g;
const swap = (arr, i, j) => {
    let t = arr[i];
    arr[i] = arr[j];
    arr[j] = t;
}
export default {
    shuffle: (arr) => {
        let arrx = arr.slice();
        for(let i = 0; i < arrx.length; i ++ ){
            let j = random(i);
            swap(arrx, i ,j)
        }    
        return arrx;   
    },
    buling: (num) => num < 10 ? `0${num}` : num,
    formatLyric: (lyricStr) => {
        if(lyricStr == null || lyricStr == ''){
            return [];
        }
        return lyricStr.split(/\n/gis).map(ele => {
            let index2 = ele.indexOf(":");
            let index3 = ele.indexOf(".");
            let index4 = ele.lastIndexOf("]");
            let min = ele.slice(1, index2);
            let sec = ele.slice(index2 + 1, index3);
            let mill = ele.slice(index3 + 1, index4);
            return {
              min,
              sec,
              mill,
              time:
                parseInt(mill) + parseInt(sec * 1000) + parseInt(min) * 60 * 1000,
              lyric: ele.slice(index4 + 1),
              item: ele,
            };
        })
    }
}