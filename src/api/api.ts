/*
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2021-08-17 15:48:37
 * @LastEditors: zouwenqin
 * @LastEditTime: 2022-01-06 09:24:37
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
    }),

    // 获取歌手部分热门歌曲
    _getSingerDetail: <K> (id: string): returnType<K> => request.getAxiosFactory()({
        url: '/api/artists',
        method: 'GET',
        params: {
            id: id
        }
    }),

    // 获取歌手专辑
    _getSingerAlbum: <K> (params: any): returnType<K> => request.getAxiosFactory()({
        url: '/api/artist/album',
        method: 'GET',
        params: params
    }),

    // 获取歌手全部歌曲
    _getSingerAllSongs: <K> (params: any): returnType<K> => request.getAxiosFactory()({
        url: '/api/artist/songs',
        method: 'GET',
        params: params
    }),
    
    // 查询歌曲详情
    _getSongsDetail: <K> (params: any): returnType<K> => request.getAxiosFactory()({
        url: '/api/song/detail',
        method: 'GET',
        params: params
    }),

    // 获取歌曲url
    _getSongUrl: <K> (id: string): returnType<K> => request.getAxiosFactory()({
        url: '/api/song/url',
        method: 'GET',
        params: {
            id: id
        }
    }),

    // 获取歌手详情
    _getArtistDetail: <K> (id: string): returnType<K> => request.getAxiosFactory()({
        url: '/api/artist/detail',
        method: 'GET',
        params: {
            id: id
        }
    })
 } 