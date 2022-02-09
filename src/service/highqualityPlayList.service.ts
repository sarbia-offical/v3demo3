import api from '@/api/api';
interface responseType{
    code: number
    result: any
}
export default {
    personalized: (name: string) => api._Personalized<responseType>({
        keywords: name
    })
}