/*
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2021-08-17 15:48:37
 * @LastEditors: zouwenqin
 * @LastEditTime: 2021-10-13 23:26:43
 */
import request from '@/utils/request';
type returnType<T> = () => Promise<T>;
export default {
    _getSongsByName : <K> (params: any): returnType<K> => request.getAxiosFactory()({
        url: '/api/cloudsearch',
        method: 'GET',
        params
    }),

    _getSongById: <K> (params: any): returnType<K> => request.getAxiosFactory()({
        url: '/api/song/url',
        method: 'GET',
        params
    }),

    _getSongLyric: <K> (params: any): returnType<K> => request.getAxiosFactory()({
        url: '/api/lyric',
        method: 'GET',
        params
    })
}