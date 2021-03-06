/*
 * @Description: 
 * @version: 
 * @Author: zouWenQin
 * @Date: 2021-08-17 15:41:47
 * @LastEditors: zouwenqin
 * @LastEditTime: 2022-02-09 15:07:50
 */
const axios = require('axios');
import constant from '@/assets/js/constant';
export default class {
    
    private static axiosFactory: any = null;

    /**
     * @name: 
     * @msg: 
     * @param {*}
     * @return {*}
     */    
    public static inital(): any {
        this.axiosFactory = !this.axiosFactory ? axios.create({
            baseUrl: process.env.VUE_APP_SERVE_REQUESTURL,
            timeout: 15000
        }) : this.axiosFactory as any;
        this.axiosFactory.interceptors.response.use((response: any) => {
            const { data, status } = response;
            const { code } = data;
            if(code == 200 && status == 200) {
                return Object.assign({},{ msg: '请求成功' }, data);
            } else {
                return Object.assign({},{ result: {} }, data);
            }
        }, (error) => {
            const {message, code} = error;
            return { code: constant.ERROR_CODE[code], msg: message }
        })
    }

    /**
     * @name: 
     * @msg: 
     * @param {*}
     * @return {*}
     */    
    public static getAxiosFactory(): any{
        return this.axiosFactory;
    }   
}