/*
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2021-12-02 09:53:04
 * @LastEditors: zouwenqin
 * @LastEditTime: 2021-12-02 15:16:58
 */
const random = (i) => Math.floor( Math.random() * (i + 1) );
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
    buling: (num) => num < 10 ? `0${num}` : num
}