/*
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2021-11-15 10:37:05
 * @LastEditors: zouwenqin
 * @LastEditTime: 2022-01-12 11:24:05
 */
import api from '@/api/api';
interface IResponseType{
    code: number
    result: any
}
//主页的服务层
export default {
    getSongsByName: (name: string) => api._getSongsByName<IResponseType>({
        keywords: name
    }),
    getSongById: (id: string) => api._getSongById<IResponseType>({
        id: id
    }),
    search: (params: any) => api._search<IResponseType>(params)
}