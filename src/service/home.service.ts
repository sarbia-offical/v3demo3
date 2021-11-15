import api from '@/api/api';
interface responseType{
    code: number
    result: any
}
//主页的服务层
export default {
    getSongsByName: (name: string) => api._getSongsByName<responseType>({
        keywords: name
    }),
    getSongById: (id: string) => api._getSongById<responseType>({
        id: id
    }),
}