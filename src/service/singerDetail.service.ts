import api from '@/api/api';
interface IResponseType{
    hotSongs: Array<any>,
    artist: object,
    code: number,
    more: boolean,
    msg: string,
}
interface IGetSingerAlbumType{
    id: string,
    limit?: string,
    offset?: string
}
export default {
    getSingerDetail: (id: string) => api._getSingerDetail<IResponseType>(id),
    getSingerAlbum: (params: IGetSingerAlbumType) => api._getSingerAlbum<IResponseType>(params)
}
