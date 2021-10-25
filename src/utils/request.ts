/*
 * @Description: 
 * @version: 
 * @Author: zouWenQin
 * @Date: 2021-08-17 15:41:47
 * @LastEditors: zouWenQin
 * @LastEditTime: 2021-08-17 15:48:13
 */
const axios = require('axios');
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
        })
        return this.axiosFactory;
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