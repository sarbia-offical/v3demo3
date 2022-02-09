/*
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2021-11-15 10:37:05
 * @LastEditors: zouwenqin
 * @LastEditTime: 2022-01-18 16:33:28
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
    search: (params: any) => api._search<IResponseType>(params),
    searchAllParams: async (keywords: string) => {
        const p1 = api._search<IResponseType>({ keywords, type: 1 });
        const p2 = api._search<IResponseType>({ keywords, type: 10 });
        const p3 = api._search<IResponseType>({ keywords, type: 100 });
        const results = await Promise.all([p1,p2,p3]);
        let maps = results.map(ele => {
            let obj = {}
            let arr: any = Object.values(ele.result).filter(ele => Object.prototype.toString.call(ele) == '[object Array]')[0]; 
            if(arr.length > 0){
                if(!!arr[0] && !!arr[0]['alg']){
                    // 如果为专辑
                    obj['type'] = 10;
                    obj['arr'] = arr;
                } else if(!!arr[0]['album']){
                    // 如果为歌曲
                    obj['type'] = 1;
                    obj['arr'] = arr;
                } else if(arr[0]['albumSize'] > 0 && arr[0]['mvSize'] > 0){
                    // 如果为歌手
                    obj['type'] = 100;
                    obj['arr'] = arr;
                }   
            }
            return obj;
        })
        return maps;
    }
}