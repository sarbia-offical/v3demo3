import api from '@/api/api';
interface responseType{
    code: number
    result: any
}
export default {
    getSongsByName: (name: string) => api._getSongsByName<responseType>({
        keywords: name
    }),
    getSongById: (id: string) => api._getSongById<responseType>({
        id: id
    }),
}