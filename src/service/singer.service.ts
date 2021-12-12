/*
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2021-11-02 15:30:46
 * @LastEditors: zouwenqin
 * @LastEditTime: 2021-11-03 10:17:22
 */
import api from '@/api/api';
const pinyin = require('pinyin')
interface IGetArtistType{
    artists: Array<any>,
    code: number,
    more: boolean,
    msg: string,
}
interface IGetArtistSongsType{
    songs: Array<any>,
    code: number,
    more: boolean,
    msg: string,
}
interface IParamsType{
    type?: string,
    area?: string,
    offset?: string,
    limit?: string
}

export default {
    // 根据不同的歌手的服务层
    getArtist: (params: IParamsType) => {
        const singerList = {};
        return new Promise((resolve, reject) => {
            api._getArtist<IGetArtistType>(params).then(res => {
                if(res.code == 500){
                    res['singerList'] = {};
                    resolve(res);
                } else {
                    const {artists} = res;
                    artists.forEach((ele, index) => {
                        const pinYings = pinyin(ele.name);
                        if (!pinYings && !!pinYings.length) {
                            return;
                        }
                        const prefixPinyin = pinYings[0][0].slice(0, 1).toUpperCase();
                        if (prefixPinyin) {
                            if (!singerList[prefixPinyin]) {
                                singerList[prefixPinyin] = {
                                    title: prefixPinyin,
                                    list: []
                                }
                            }
                            singerList[prefixPinyin].list.push(ele);
                        }
                    })
                    res['singerList'] = singerList;
                    resolve(res);
                }
            }).catch(reason => {
                const {msg} = reason;
                reject({
                    code: -1,
                    msg: msg
                })
            })
        })
    },
    getArtistSongs: (params: string) => api._getArtistSongs<IGetArtistSongsType>(params),
    getTopArtists: (params: IParamsType) => api._getTopArtists<IParamsType>(params)
}

