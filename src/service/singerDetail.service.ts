/*
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2021-12-03 08:43:49
 * @LastEditors: zouwenqin
 * @LastEditTime: 2022-01-06 09:29:34
 */
import api from '@/api/api';
interface IResponseType{
    hotSongs: Array<any>,
    artist: object,
    code: number,
    more: boolean,
    msg: string,
}
interface IResponseType2{
    code: number,
    data: Array<any>,
    message: string
}
interface IPaging{
    id: string,
    limit?: string,
    offset?: string
}
interface IAllSongsType{
    code: number,
    more: boolean,
    msg: string,
    songs: Array<any>,
    total: number
}

interface ISongsDetail{
    songs: Array<any>,
    code: number
}
export default {
    getSingerDetail: (id: string) => api._getSingerDetail<IResponseType>(id),
    getSingerAlbum: (params: IPaging) => api._getSingerAlbum<IResponseType>(params),
    getArtistDetail: (id: string) => api._getArtistDetail<IResponseType2>(id),
    getSingerAllSongs: (params: IPaging) => api._getSingerAllSongs<IAllSongsType>(params),
    getSongsDetail: (ids: string) => api._getSongsDetail<ISongsDetail>({
        ids: ids
    })
}
