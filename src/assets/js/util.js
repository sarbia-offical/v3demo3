/*
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2021-12-02 09:53:04
 * @LastEditors: zouwenqin
 * @LastEditTime: 2022-01-21 17:15:00
 */
const random = (i) => Math.floor(Math.random() * (i + 1));
const timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g;
const swap = (arr, i, j) => {
    let t = arr[i];ƒ
    arr[i] = arr[j];
    arr[j] = t;
}
export default {
    shuffle: (arr) => {
        let arrx = arr.slice();
        for (let i = 0; i < arrx.length; i++) {
            let j = random(i);
            swap(arrx, i, j)
        }
        return arrx;
    },
    buling: (num) => num < 10 ? `0${num}` : num,
    formatLyric: (lyricStr) => {
        const lines = lyricStr.split('\n')
        const arr = [];
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i]
            let result = timeExp.exec(line)
            if (result) {
                const txt = line.replace(timeExp, '').trim()
                if (txt) {
                    arr.push({
                        time: result[1] * 60 * 1000 + result[2] * 1000 + (result[3] || 0) * 10,
                        txt
                    })
                }
            }
        }
        arr.sort((a, b) => {
            return a.time - b.time
        })
        return arr;
    }
}