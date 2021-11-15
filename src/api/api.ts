/*
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2021-08-17 15:48:37
 * @LastEditors: zouwenqin
 * @LastEditTime: 2021-11-03 10:17:23
 */
import request from '@/utils/request';
type returnType<T> = Promise<T>;
export default {
    // 根据名称获取所有歌曲
    _getSongsByName : <K> (params: any): returnType<K> => request.getAxiosFactory()({
        url: '/api/cloudsearch',
        method: 'GET',
        params
    }),

    // 获取歌曲url
    _getSongById: <K> (params: any): returnType<K> => request.getAxiosFactory()({
        url: '/api/song/url',
        method: 'GET',
        params
    }),

    // 获取歌词
    _getSongLyric: <K> (params: any): returnType<K> => request.getAxiosFactory()({
        url: '/api/lyric',
        method: 'GET',
        params
    }),

    // 推荐歌单
    _Personalized: <K> (params: any): returnType<K> => request.getAxiosFactory()({
        url: '/api/personalized',
        method: 'GET',
        params
    }),

    // 根据条件搜索歌手
    _getArtist: <K> (params: any): returnType<K> => request.getAxiosFactory()({
        url: '/api/artist/list',
        method: 'GET',
        params
    }),

    // 查询歌手的所有歌曲
    _getArtistSongs: <K> (params: any): returnType<K> => request.getAxiosFactory()({
        url: '/api/artist/songs',
        method: 'GET',
        params
    }),

    // 查询热门歌手
    _getTopArtists: <K> (params: any): returnType<K> => request.getAxiosFactory()({
        url: '/api/top/artists',
        method: 'GET',
        params
    })
}