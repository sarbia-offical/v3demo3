import api from '@/api/api';
interface IResponseType{
    code: number,
    data: Array<any>
}

export default {
    getSongUrl: (id: string) => api._getSongUrl<IResponseType>(id),
    getSongLyric: (id: string) => api._getSongLyric(id)
}
